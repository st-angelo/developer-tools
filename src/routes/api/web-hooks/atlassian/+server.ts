import IssueCache from '$lib/stores/issueCacheStore.js';
import IssueQueue from '$lib/stores/issueQueueStore.js';
import PojoUtil from '$lib/utils/pojo.js';

export async function POST(event) {
	try {
		const issueResponse = await event.request.json();
		const issue = PojoUtil.getIssueDto(issueResponse.issue);
		IssueCache.set(issue);
		IssueQueue.push({
			issue,
		});
	} catch (err) {
		console.error('An update was received from Atlassian, but it could not be processed.', err);
	}
	return new Response();
}
