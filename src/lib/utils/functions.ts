import { PUBLIC_ATLASSIAN_CLOUD_URL } from '$env/static/public';
import type { FormResponse } from '$lib/data/types/general';
import type { GetTasksOptions } from '$lib/data/types/task';
import type { Task } from '@prisma/client';

export function getCompactName(name: string | undefined) {
	if (!name) return '';
	const parts = name.split(' ');
	const last = parts.pop();
	if (!last) return '';
	parts.push(`${last.substring(0, 1)}.`);
	return parts.join(' ');
}

export function getCompactString(value: string | undefined, maxLength: number) {
	if (!value) return '';
	if (value.length <= maxLength + 3) return value;
	return value.substring(0, maxLength) + '...';
}

export function setQueryParam(name: string, value: string) {
	const url = new URL(window.location.href);
	url.searchParams.set(name, value);
	window.history.replaceState({}, '', url);
}

export function getAtlassianIssueUrl(key: string) {
	return `${PUBLIC_ATLASSIAN_CLOUD_URL}/browse/${key}`;
}

export function getTasksOptionsFromSearchParams(searchParams: URLSearchParams) {
	const appCode = searchParams.get('appCode');
	const route = searchParams.get('route');
	const completed = Number(searchParams.get('completed') || undefined);
	const page = Number(searchParams.get('page'));
	const size = Number(searchParams.get('size'));
	const orderBy = searchParams.get('orderBy');
	const direction = searchParams.get('direction');

	const taskKeys: (keyof Task)[] = ['added', 'appCode', 'completed', 'id', 'issueKey', 'route'];

	return {
		appCode,
		route,
		completed: !Number.isNaN(completed) ? Boolean(completed) : undefined,
		skip: (page - 1) * (size || 5) || 0,
		take: size && size <= 5 ? size : 5,
		orderBy: taskKeys.some((key) => key === orderBy) ? orderBy : 'added',
		direction: direction === 'asc' || direction === 'desc' ? direction : 'asc',
	} as GetTasksOptions;
}

export function errorResponse(content: string, persistent?: boolean): FormResponse {
	return {
		message: {
			type: 'error',
			content,
			persistent,
		},
	};
}
