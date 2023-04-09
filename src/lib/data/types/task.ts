import type { Task } from '@prisma/client';
import type { AtlassianIssueDto } from '../integration/atlassian/dto';

export type TaskDto = {
	id: number;
	appCode: string;
	route: string;
	issueKey: string;
	completed: boolean;
	issue: AtlassianIssueDto | null;
};

export type TaskList = {
	total: number;
	tasks: Task[];
};

export type TaskDtoList = {
	total: number;
	tasks: TaskDto[];
};

// #region Inputs

export type GetTasksOptions = {
	appCode: string;
	route: string;
	completed?: boolean;
	skip: number;
	take: number;
	orderBy: keyof Task;
	direction: 'asc' | 'desc';
};

export type AddTaskInput = {
	appCode: string;
	route: string;
	issueKey: string;
	completed: boolean;
	removeOnCompleted?: boolean;
};

// #endregion
