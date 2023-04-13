import type { AtlassianIssueDto } from '$lib/data/integration/atlassian/dto';
import { writable, type Subscriber } from 'svelte/store';

export type IssueQueueItem = {
	appCode?: string;
	route?: string;
	completed?: boolean;
	issue: AtlassianIssueDto;
};

const issueQueueStore = writable<IssueQueueItem[]>([]);

function push(item: IssueQueueItem) {
	issueQueueStore.update((prev) => [...prev, item]);
}

function subscribe(handle: Subscriber<IssueQueueItem>) {
	return issueQueueStore.subscribe((queue) => {
		if (queue.length === 0) return;
		for (const item of queue) handle(item);
		issueQueueStore.set([]);
	});
}

const IssueQueue = {
	push,
	subscribe,
};

export default IssueQueue;
