import { ATLASSIAN_EMAIL, ATLASSIAN_TOKEN } from '$env/static/private';
import { PUBLIC_ATLASSIAN_CLOUD_URL } from '$env/static/public';
import type { OperationResponse } from '$lib/data/types/general';
import IssueCache from '$lib/stores/issueCacheStore';
import PojoUtil from '$lib/utils/pojo';
import client from './client';
import type { AtlassianIssueDto } from './dto';

export async function getIssue(key: string): Promise<OperationResponse<AtlassianIssueDto>> {
	let cachedIssue = IssueCache.get(key);
	if (!cachedIssue) {
		try {
			console.log(ATLASSIAN_EMAIL, ATLASSIAN_TOKEN, PUBLIC_ATLASSIAN_CLOUD_URL);
			const issue = await client.issues.getIssue({ issueIdOrKey: key });
			cachedIssue = IssueCache.set(PojoUtil.getIssueDto(issue));
		} catch (err) {
			console.error(err);
			return {
				status: 'error',
				error: 'Could not retrieve a valid issue from Atlassian',
			};
		}
	}
	return {
		status: 'success',
		data: cachedIssue,
	};
}
