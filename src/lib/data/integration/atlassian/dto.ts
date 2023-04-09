import type { AvatarUrls } from 'jira.js/out/version3/models';

export type AtlassianIssueTypeDto = {
	id?: string;
	name?: string;
	description?: string;
	iconUrl?: string;
};

export type AtlassianStatusDto = {
	id?: string;
	name?: string;
	description?: string;
	iconUrl?: string;
};

export type AtlassianUserDto = {
	displayName?: string;
	emailAddress?: string;
	avatarUrls?: AvatarUrls;
};

export type AtlassianPriorityDto = {
	id?: string;
	name?: string;
	description?: string;
	iconUrl?: string;
};

export type AtlassianFieldsDto = {
	summary: string;
	issuetype?: AtlassianIssueTypeDto;
	status: AtlassianStatusDto;
	assignee?: AtlassianUserDto;
	creator: AtlassianUserDto;
	reporter: AtlassianUserDto;
	priority: AtlassianPriorityDto;
	projectName?: string;
};

export type AtlassianIssueDto = {
	id: string;
	key: string;
	fields: AtlassianFieldsDto;
};
