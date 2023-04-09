import type { AtlassianIssueDto } from '$lib/data/integration/atlassian/dto';
import type { TaskDto } from '$lib/data/types/task';
import type { Task } from '@prisma/client';
import type { Issue } from 'jira.js/out/version3/models';

class PojoUtil {
	static getTaskDto(task: Task, issue: AtlassianIssueDto | null): TaskDto {
		return {
			id: task.id,
			appCode: task.appCode,
			route: task.route,
			issueKey: task.issueKey,
			completed: task.completed,
			issue,
		};
	}

	static getIssueDto(issue: Issue): AtlassianIssueDto {
		return {
			id: issue.id,
			key: issue.key,
			fields: {
				summary: issue.fields.summary,
				issuetype: issue.fields.issuetype && {
					id: issue.fields.issuetype.id,
					name: issue.fields.issuetype.name,
					description: issue.fields.issuetype.description,
					iconUrl: issue.fields.issuetype.iconUrl,
				},
				status: {
					id: issue.fields.status.id,
					name: issue.fields.status.name,
					description: issue.fields.status.description,
					iconUrl: issue.fields.status.iconUrl,
				},
				assignee: issue.fields.assignee && {
					displayName: issue.fields.assignee.displayName,
					emailAddress: issue.fields.assignee.emailAddress,
					avatarUrls: issue.fields.assignee.avatarUrls,
				},
				creator: {
					displayName: issue.fields.creator.displayName,
					emailAddress: issue.fields.creator.emailAddress,
					avatarUrls: issue.fields.creator.avatarUrls,
				},
				reporter: {
					displayName: issue.fields.reporter.displayName,
					emailAddress: issue.fields.reporter.emailAddress,
					avatarUrls: issue.fields.reporter.avatarUrls,
				},
				priority: {
					id: issue.fields.priority.id,
					name: issue.fields.priority.name,
					description: issue.fields.priority.description,
					iconUrl: issue.fields.priority.iconUrl,
				},
				projectName: issue.fields.project?.name,
			},
		};
	}
}

export default PojoUtil;
