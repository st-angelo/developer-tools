import { getProjectXCompletedStatuses, updateTasksStatusAndCleanup } from '$lib/data/repository/taskRepository.js';
import IssueCache from '$lib/stores/issueCacheStore.js';
import IssueQueue from '$lib/stores/issueQueueStore.js';
import PojoUtil from '$lib/utils/pojo.js';

export async function POST(event) {
	try {
		const issueResponse = await event.request.json();
		const issue = PojoUtil.getIssueDto(issueResponse.issue);

		const projectXCompletedStatusesResponse = await getProjectXCompletedStatuses();
		if (projectXCompletedStatusesResponse.status === 'error')
			return new Response('Could not process this request.', { status: 400 });

		const completed = projectXCompletedStatusesResponse.data.some(
			(pxcs) => pxcs.projectName === issue.fields.projectName && pxcs.statusName === issue.fields.status.name,
		);

		// Don't care about response, we still need to send the issue to the frontend
		await updateTasksStatusAndCleanup(issue.key, completed);

		IssueCache.set(issue);
		IssueQueue.push({
			completed,
			issue,
		});
	} catch (err) {
		console.error('An update was received from Atlassian, but it could not be processed.', err);
	}
	return new Response();
}
