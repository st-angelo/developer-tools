<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { TaskDto } from '$lib/data/types/task';
	import { getAtlassianIssueUrl } from '$lib/utils/functions';
	import { slide } from 'svelte/transition';

	export let task: TaskDto;

	let loading = false;
	let showDetails = false;

	const submitRemoveTask: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};
</script>

<div class="flex w-full flex-col gap-1 rounded-md p-2 text-sm shadow-md hover:bg-[#f5f5f5] xs:flex-row">
	<div class="flex cursor-pointer items-center justify-between">
		<div class="flex items-center gap-2">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				class="h-4 w-4"
				title={task.issue?.fields.issuetype?.name}
				src={task.issue?.fields.issuetype?.iconUrl}
				alt={`${task.issue?.fields.issuetype?.name} icon`}
				on:click={() => (showDetails = !showDetails)}
			/>
			<a
				href={getAtlassianIssueUrl(task.issueKey)}
				target="_blank"
				rel="noopener noreferrer"
				class="text-lg font-bold text-sky-500"
				title={task.issue?.fields.summary}
				>{task.issueKey}
			</a>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="grow self-stretch" on:click={() => (showDetails = !showDetails)} />
		<div class="flex items-center gap-2">
			<div
				class="select-none rounded-lg border-[1px] border-sky-500 bg-sky-500 px-2 font-semibold text-white"
				title={'Status'}
				class:bg-gray-500={task.completed}
				class:border-gray-500={task.completed}
			>
				{task.issue?.fields.status.name}
			</div>
			<form method="post" action="?/removeTask" use:enhance={submitRemoveTask} class="">
				<input id="id" name="id" hidden value={task.id} />
				<button disabled={loading} type="submit" title="Remove" class="text-red-500 disabled:text-gray-500"
					><iconify-icon icon="mdi:trash-can-empty" width={20} /></button
				>
			</form>
		</div>
	</div>
	{#if showDetails}
		<div class="flex flex-col gap-1" transition:slide={{ duration: 200 }}>
			<div class="flex items-center gap-1">
				<img
					class="h-4 w-4 cursor-pointer"
					title={`Priority: ${task.issue?.fields.priority.name}`}
					src={task.issue?.fields.priority?.iconUrl}
					alt={`${task.issue?.fields.priority?.name} icon`}
				/>
				<p class="text-xs">
					{task.issue?.fields.summary}
				</p>
			</div>
			<div class="flex items-center justify-between text-xs font-semibold text-gray-600">
				<div class="flex items-end gap-2">
					<span>Reporter:</span>
					<a rel="noopener noreferrer" href={`msteams://teams.microsoft.com/l/chat/0/0?users=${'achirca@totalsoft.ro'}`}
						><img
							class="cursor-pointer rounded-lg"
							title={`${task.issue?.fields.reporter.displayName}`}
							src={task.issue?.fields.reporter.avatarUrls?.['24x24']}
							alt={`${task.issue?.fields.reporter.displayName} avatar`}
						/></a
					>
				</div>
				<div class="flex items-end gap-2">
					<span>Assigned to:</span>
					{#if task.issue?.fields.assignee}
						<a
							rel="noopener noreferrer"
							href={`msteams://teams.microsoft.com/l/chat/0/0?users=${'astancioi@totalsoft.ro'}`}
							><img
								class="cursor-pointer rounded-lg"
								title={`${task.issue?.fields.assignee?.displayName}`}
								src={task.issue?.fields.assignee?.avatarUrls?.['24x24']}
								alt={`${task.issue?.fields.assignee?.displayName} avatar`}
							/></a
						>
					{:else}
						<div
							title="Not assigned"
							class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border-sky-200 bg-sky-100 text-sky-500 hover:border-[1px]"
						>
							<iconify-icon icon="tabler:user-x" width={15} />
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
