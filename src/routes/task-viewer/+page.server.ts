import { getIssue } from '$lib/data/integration/atlassian/service.js';
import { addTask, getProjectXCompletedStatuses, removeTask } from '$lib/data/repository/taskRepository.js';
import { getTaskDtos } from '$lib/data/service/taskService.js';
import { errorResponse, getTasksOptionsFromSearchParams } from '$lib/utils/functions.js';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const options = getTasksOptionsFromSearchParams(event.url.searchParams);
	const taskDtosResponse = await getTaskDtos(options);

	if (taskDtosResponse.status === 'error')
		return {
			error: taskDtosResponse.error,
			tasks: null,
			total: 0,
		};
	else
		return {
			tasks: taskDtosResponse.data.tasks,
			total: taskDtosResponse.data.total,
		};
};

export const actions = {
	addTask: async ({ request }) => {
		const formData = await request.formData();

		const appCode = formData.get('appCode')?.toString();
		const route = formData.get('route')?.toString();
		const issueKey = formData.get('issueKey')?.toString();
		const removeOnCompleted = formData.get('removeOnCompleted')?.toString() === 'on' ? true : false;

		if (!appCode || !route || !issueKey) return fail(400, errorResponse('Could not add task. Invalid input.'));

		const issueResponse = await getIssue(issueKey);
		if (issueResponse.status === 'error') return fail(400, errorResponse(issueResponse.error));

		const projectXCompletedStatusesResponse = await getProjectXCompletedStatuses();
		if (projectXCompletedStatusesResponse.status === 'error')
			return fail(400, errorResponse(projectXCompletedStatusesResponse.error));

		const issue = issueResponse.data;

		const completed = projectXCompletedStatusesResponse.data.some(
			(pxcs) => pxcs.projectName === issue.fields.projectName && pxcs.statusName === issue.fields.status.name,
		);

		if (removeOnCompleted && completed) {
			return fail(400, errorResponse('The task is already marked as completed.'));
		}

		const addTaskResponse = await addTask({
			appCode,
			route,
			issueKey,
			completed,
			removeOnCompleted,
		});

		if (addTaskResponse.status === 'error') return fail(400, errorResponse(addTaskResponse.error));
	},
	removeTask: async ({ request }) => {
		const formData = await request.formData();

		const id = Number(formData.get('id'));

		if (!id) return fail(400, errorResponse('Invalid task id'));

		const removeTaskResponse = await removeTask(id);

		if (removeTaskResponse.status === 'error') return fail(400, errorResponse(removeTaskResponse.error));
	},
};
