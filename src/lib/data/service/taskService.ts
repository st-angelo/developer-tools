import PojoUtil from '$lib/utils/pojo';
import { getIssue } from '../integration/atlassian/service';
import { getTasks } from '../repository/taskRepository';
import type { OperationResponse } from '../types/general';
import type { GetTasksOptions, TaskDto, TaskDtoList } from '../types/task';

export async function getTaskDtos(options: GetTasksOptions): Promise<OperationResponse<TaskDtoList>> {
	const tasksResponse = await getTasks(options);

	if (tasksResponse.status === 'error')
		return {
			status: 'error',
			error: tasksResponse.error,
		};
	const tasks = tasksResponse.data.tasks;
	const dtos: TaskDto[] = [];

	const issuePromises = tasks.map((task) =>
		getIssue(task.issueKey).then((issueResponse) => {
			if (issueResponse.status === 'success') dtos.push(PojoUtil.getTaskDto(task, issueResponse.data));
			else dtos.push(PojoUtil.getTaskDto(task, null));
		}),
	);

	await Promise.allSettled(issuePromises);
	return {
		status: 'success',
		data: {
			total: tasksResponse.data.total,
			tasks: dtos,
		},
	};
}
