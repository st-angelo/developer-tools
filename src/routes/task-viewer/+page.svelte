<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { IssueQueueItem } from '$lib/stores/issueQueueStore.js';
	import { page as pageStore, navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import Task from './Task.svelte';
	import Message from '$lib/components/Message.svelte';
	import { fly } from 'svelte/transition';
	import AddTask from './AddTask.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import TaskFilters from './TaskFilters.svelte';
	import { Events, type DevToolsMessageEvent } from 'developer-tools-common-language';
	import { getCompactString } from '$lib/utils/functions';

	export let data;

	$: tasks = data.tasks;

	// #region Search params

	let appCode = '';
	let route = '';
	let completed: 0 | 1 | null = 0;
	let page = 1;
	let direction: 'asc' | 'desc' = 'asc';

	$: {
		browser &&
			goto(
				`/task-viewer?appCode=${appCode}&route=${route}&completed=${completed}&page=${page}&direction=${direction}`,
				{
					replaceState: true,
					keepFocus: true,
					invalidateAll: true,
				},
			);
	}

	$: internalNavigating = $navigating && $navigating.to?.route.id === '/task-viewer';

	// #endregion

	let routeNotConfigured: string | null = null;

	let hideMessageTimeout: number | undefined;
	$: showMessage = Boolean($pageStore.form?.message);
	$: {
		if ($pageStore.form?.message && !$pageStore.form.message.persistent) {
			clearTimeout(hideMessageTimeout);
			hideMessageTimeout = setTimeout(() => (showMessage = false), 30000);
		}
	}

	let showAdd = false;

	// #region Handle messages from parent

	function handleParentMessage({ data }: DevToolsMessageEvent) {
		if (!data) return;
		if (data.type === Events.TaskViewer.ParentRouteChanged) {
			appCode = data.payload.appCode;
			route = data.payload.route;
			page = 1;
			routeNotConfigured = null;
		} else if (data.type === Events.TaskViewer.RouteNotConfigured) {
			route = '';
			routeNotConfigured = data.payload.route;
		}
	}

	// #endregion

	// #region Subscrible to issue updates

	function handleQueuedIssue(event: MessageEvent) {
		if (!tasks) return;

		let shouldRefresh = false;

		const queuedIssue = JSON.parse(event.data) as IssueQueueItem;
		if (queuedIssue.appCode === appCode && queuedIssue.route === route) {
			const task = tasks.find((task) => task.issueKey === queuedIssue.issue.key);
			if (task) {
				task.issue = queuedIssue.issue;
				task.completed = queuedIssue.completed || false;
				shouldRefresh = task.completed && (task.removeOnCompleted || completed !== 1);
			} else {
				shouldRefresh = true;
			}
		}
		if (!queuedIssue.appCode && !queuedIssue.route) {
			const task = tasks.find((task) => task.issueKey === queuedIssue.issue.key);
			if (task) {
				task.issue = queuedIssue.issue;
				task.completed = queuedIssue.completed || false;
				shouldRefresh = task.completed && (task.removeOnCompleted || completed !== 1);
			}
		}
		if (shouldRefresh) {
			goto(
				`/task-viewer?appCode=${appCode}&route=${route}&completed=${completed}&page=${page}&direction=${direction}`,
				{
					replaceState: true,
					keepFocus: true,
					invalidateAll: true,
				},
			);
		} else tasks = [...tasks];
	}

	function subscribeToIssueUpdates() {
		const sse = new EventSource('/task-viewer');
		sse.onmessage = handleQueuedIssue;
		return () => sse.close();
	}

	// #endregion

	onMount(function () {
		const unsubscribeFromIssueUpdates = subscribeToIssueUpdates();
		window.parent.postMessage({ type: Events.TaskViewer.Loaded, payload: null }, '*');
		return function () {
			unsubscribeFromIssueUpdates();
		};
	});
</script>

<svelte:window on:message={handleParentMessage} />

<div class="relative flex h-full flex-col">
	<div class="flex grow flex-col">
		<div class="my-4 flex items-center justify-between px-2">
			<div class="flex items-center gap-2">
				<a href="/" title="Go back" class="contents outline-none hover:text-theme focus:text-theme"
					><iconify-icon icon="ion:arrow-back-outline" width="18" /></a
				>
				<span class="text-xl font-medium">PAGE:</span>
				<span title={route} class="max-w-[230px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[15px]"
					>{routeNotConfigured || route}</span
				>
			</div>
			<button
				class="flex h-8 w-8 items-center justify-center rounded-full bg-theme text-white	outline-none hover:bg-theme-dark focus:bg-theme-dark disabled:bg-gray-500"
				on:click={() => (showAdd = true)}
				disabled={Boolean(routeNotConfigured)}
				title="Add"
			>
				<iconify-icon icon="ic:round-plus" width={25} />
			</button>
		</div>
		<div
			class="container-shadow flex grow flex-col rounded-lg bg-white"
			class:blur-sm={showAdd}
			class:pointer-events-none={showAdd}
			class:select-none={showAdd}
		>
			{#if routeNotConfigured}
				<span title={routeNotConfigured} class="font-mediump m-auto px-5 text-center text-sm"
					>The route {getCompactString(routeNotConfigured, 60)} is not configured.</span
				>
			{:else}
				<TaskFilters
					{completed}
					{direction}
					onChangeCompleted={(value) => {
						completed = value;
						page = 1;
					}}
					onChangeDirection={(value) => {
						direction = value;
						page = 1;
					}}
				/>
				<div class="scrollable flex max-h-[530px] grow flex-col items-center gap-3 overflow-y-auto p-5">
					{#if internalNavigating}
						<div class="dot-flashing m-auto" />
					{:else if tasks}
						{#if tasks.length > 0}
							{#each tasks as task (task.id)}
								<Task {task} />
							{/each}
						{:else}
							<span class="m-auto text-sm">No issues associated with this page & filters</span>
						{/if}
					{:else}
						<span>{$pageStore.data.error}</span>
					{/if}
				</div>
				<div class="flex justify-center px-5 pb-5 pt-1">
					<Pagination {page} total={data.total} onPageChange={(value) => (page = value)} />
				</div>
			{/if}
		</div>
	</div>
	{#if showAdd}
		<AddTask onClose={() => (showAdd = false)} />
	{/if}
	{#if showMessage}
		<div
			in:fly|local={{ y: 50, duration: 150 }}
			out:fly|local={{ x: 700, duration: 200 }}
			class="absolute bottom-8 w-full p-5"
		>
			<Message message={$pageStore.form?.message} onClose={() => (showMessage = false)} />
		</div>
	{/if}
</div>
