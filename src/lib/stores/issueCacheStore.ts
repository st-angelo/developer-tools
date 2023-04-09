import type { AtlassianIssueDto } from '$lib/data/integration/atlassian/dto';
import { get as getStore, writable } from 'svelte/store';

const issueCacheStore = writable<AtlassianIssueDto[]>([]);

function get(key: string) {
	return getStore(issueCacheStore).find((cached) => cached.key === key);
}

function set(issue: AtlassianIssueDto) {
	issueCacheStore.update((prev) => [...prev.filter((cached) => cached.key !== issue.key), issue]);
	return issue;
}

function remove(key: string) {
	issueCacheStore.update((prev) => prev.filter((cached) => cached.key !== key));
}

const IssueCache = {
	get,
	set,
	remove,
};

export default IssueCache;
