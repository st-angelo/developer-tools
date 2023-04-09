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

	// #endregion

	let routeNotRegistered: string | null = null;

	let hideMessageTimeout: number | undefined;
	$: showMessage = Boolean($pageStore.form?.message);
	$: {
		if ($pageStore.form?.message && !$pageStore.form.message.persistent) {
			clearTimeout(hideMessageTimeout);
			hideMessageTimeout = setTimeout(() => (showMessage = false), 3000);
		}
	}

	let showAdd = false;

	// #region Handle messages from parent

	function handleParentMessage({ data }: MessageEvent) {
		if (!data) return;
		if (data.type === 'route-changed') {
			appCode = data.payload.appCode;
			route = data.payload.route;
			page = 1;
			routeNotRegistered = null;
		} else if (data.type === 'route-not-registered') {
			route = '';
			routeNotRegistered = data.payload.route;
		}
	}

	// #endregion

	// #region Subscrible to issue updates

	function handleQueuedIssue(event: MessageEvent) {
		if (!tasks) return;
		const queuedIssue = JSON.parse(event.data) as IssueQueueItem;
		if (queuedIssue.appCode === appCode && queuedIssue.route === route) {
			const task = tasks.find((task) => task.issueKey === queuedIssue.issue.key);
			if (task) {
				task.issue = queuedIssue.issue;
			} else {
				goto(`/task-viewer?appCode=${appCode}&route=${route}&page=${page}&direction=${direction}`, {
					replaceState: true,
					keepFocus: true,
					invalidateAll: true,
				});
			}
		}
		if (!queuedIssue.appCode && !queuedIssue.route) {
			const task = tasks.find((task) => task.issueKey === queuedIssue.issue.key);
			if (task) {
				task.issue = queuedIssue.issue;
			}
		}
		tasks = [...tasks];
	}

	function subscribe() {
		const sse = new EventSource('/task-viewer');
		sse.onmessage = handleQueuedIssue;
		return () => sse.close();
	}

	onMount(subscribe);

	// #endregion
</script>

<svelte:window on:message={handleParentMessage} />

<div class="relative flex h-screen w-full flex-col overflow-hidden">
	{#if routeNotRegistered}
		<span>Your route {routeNotRegistered} is not registered.</span>
	{:else}
		<div class="flex justify-between px-2 py-1">
			<div class="flex items-center gap-1">
				<span class="font-semibold">Page:</span>
				<span title={route} class="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm italic"
					>{route}</span
				>
			</div>
			<button class="flex text-sky-500" on:click={() => (showAdd = true)} title="Add">
				<iconify-icon icon="ic:round-plus" width={25} />
			</button>
		</div>
		{#if showAdd}
			<AddTask onClose={() => (showAdd = false)} />
		{/if}
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
		<div class="scrollable flex grow items-center justify-center overflow-y-auto overflow-x-hidden px-3">
			{#if $navigating}
				<div class="dot-flashing" />
			{:else if tasks}
				<div class="flex w-full flex-col items-center gap-2 self-start">
					{#if tasks.length > 0}
						{#each tasks as task (task.id)}
							<Task {task} />
						{/each}
					{:else}
						<i class="mt-2 text-sm">No tasks associated with this page & filters</i>
					{/if}
				</div>
			{:else}
				<span>{$pageStore.data.error}</span>
			{/if}
		</div>
		<div class="flex justify-center p-1">
			<Pagination {page} total={data.total} onPageChange={(value) => (page = value)} />
		</div>
	{/if}
	{#if showMessage}
		<div in:fly={{ y: 50, duration: 150 }} out:fly={{ x: 700, duration: 200 }} class="absolute bottom-2 w-full p-3">
			<Message message={$pageStore.form?.message} onClose={() => (showMessage = false)} />
		</div>
	{/if}
</div>
