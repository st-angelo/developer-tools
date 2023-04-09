import type { ProjectXCompletedStatus } from '@prisma/client';
import prisma from '../prisma';
import type { OperationResponse } from '../types/general';
import type { AddTaskInput, GetTasksOptions, TaskList } from '../types/task';

export async function getTasks({
	appCode,
	route,
	completed,
	skip,
	take,
	direction,
}: GetTasksOptions): Promise<OperationResponse<TaskList>> {
	if (!appCode || !route)
		return {
			status: 'success',
			data: {
				total: 0,
				tasks: [],
			},
		};
	try {
		const total = await prisma.task.count({
			where: { appCode, route, completed },
		});
		const tasks = await prisma.task.findMany({
			where: { appCode, route, completed },
			skip,
			take,
			orderBy: { added: direction },
		});
		return {
			status: 'success',
			data: {
				total,
				tasks,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			status: 'error',
			error: 'Could not retrieve tasks from the database',
		};
	}
}

export async function getProjectXCompletedStatuses(): Promise<OperationResponse<ProjectXCompletedStatus[]>> {
	try {
		const projectXCompletedStatuses = await prisma.projectXCompletedStatus.findMany();
		return {
			status: 'success',
			data: projectXCompletedStatuses,
		};
	} catch (err) {
		console.error(err);
		return {
			status: 'error',
			error: 'Could not retrieve the collection of completed statuses for each project',
		};
	}
}

export async function addTask({
	appCode,
	route,
	issueKey,
	completed,
	removeOnCompleted,
}: AddTaskInput): Promise<OperationResponse> {
	try {
		const existing = await prisma.task.count({ where: { appCode, route, issueKey } });
		if (existing === 0) {
			await prisma.task.create({ data: { appCode, route, issueKey, completed, removeOnCompleted } });
			return {
				status: 'success',
				data: null,
			};
		} else {
			return {
				status: 'error',
				error: 'An issue with this key is already configured for this route',
			};
		}
	} catch (err) {
		console.error(err);
		return {
			status: 'error',
			error: 'Could not add task',
		};
	}
}

export async function removeTask(id: number): Promise<OperationResponse> {
	try {
		const result = await prisma.task.delete({ where: { id } });
		if (!result) {
			return {
				status: 'error',
				error: 'No task was removed',
			};
		}
		return {
			status: 'success',
			data: null,
		};
	} catch (err) {
		console.error(err);
		return {
			status: 'error',
			error: 'Could not remove task',
		};
	}
}
