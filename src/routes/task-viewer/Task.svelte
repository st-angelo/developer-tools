<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { TaskDto } from '$lib/data/types/task';
	import { getAtlassianIssueUrl, getCompactName } from '$lib/utils/functions';
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

<div class="item-shadow flex w-full flex-col gap-3 rounded-lg border-[1px] border-withered p-4 text-sm">
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
				class="text-base font-medium outline-none hover:text-theme focus:text-theme"
				title={task.issue?.fields.summary}
				>{task.issueKey}
			</a>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="grow self-stretch" on:click={() => (showDetails = !showDetails)} />
		<div class="flex items-center gap-3">
			<div
				class="select-none rounded-lg bg-theme px-3 py-1 text-xs text-white hover:bg-theme-dark"
				title={'Status'}
				class:bg-gray-500={task.completed}
			>
				{task.issue?.fields.status.name?.toUpperCase()}
			</div>
			<form method="post" action="?/removeTask" use:enhance={submitRemoveTask} class="">
				<input id="id" name="id" hidden value={task.id} />
				<button
					disabled={loading}
					type="submit"
					title="Remove"
					class="flex h-7 w-7 items-center justify-center rounded-full bg-danger-withered text-danger outline-none hover:bg-danger-light focus:bg-danger-light disabled:bg-gray-100 disabled:text-gray-500"
					><iconify-icon icon="solar:trash-bin-minimalistic-2-bold" /></button
				>
			</form>
		</div>
	</div>
	{#if showDetails}
		<div class="flex flex-col gap-3" transition:slide|local={{ duration: 200 }}>
			<div class="flex items-center gap-3 rounded-lg bg-faded p-3">
				<img
					class="h-4 w-4 cursor-pointer"
					title={`Priority: ${task.issue?.fields.priority.name}`}
					src={task.issue?.fields.priority?.iconUrl}
					alt={`${task.issue?.fields.priority?.name} icon`}
				/>
				<p>
					{task.issue?.fields.summary}
				</p>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<a
						class="outline-none hover:brightness-90 focus:brightness-90"
						rel="noopener noreferrer"
						href={`msteams://teams.microsoft.com/l/chat/0/0?users=${'achirca@totalsoft.ro'}`}
						><img
							class="h-10 w-10 cursor-pointer rounded-full"
							title={`${task.issue?.fields.reporter.displayName}`}
							src={task.issue?.fields.reporter.avatarUrls?.['48x48']}
							alt={`${task.issue?.fields.reporter.displayName} avatar`}
						/></a
					>
					<div class="flex flex-col">
						<span class="font-medium">{getCompactName(task.issue?.fields.reporter.displayName)}</span>
						<span class="text-xs text-dimmed">Reporter</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					{#if task.issue?.fields.assignee}
						<a
							class="outline-none hover:brightness-90 focus:brightness-90"
							rel="noopener noreferrer"
							href={`msteams://teams.microsoft.com/l/chat/0/0?users=${'astancioi@totalsoft.ro'}`}
							><img
								class="h-10 w-10 cursor-pointer rounded-full"
								title={`${task.issue?.fields.assignee?.displayName}`}
								src={task.issue?.fields.assignee?.avatarUrls?.['48x48']}
								alt={`${task.issue?.fields.assignee?.displayName} avatar`}
							/></a
						>
					{:else}
						<div
							title="Not assigned"
							class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-theme-light text-theme hover:brightness-90"
						>
							<iconify-icon icon="ri:user-unfollow-line" width="22" />
						</div>
					{/if}
					<div class="flex flex-col">
						<span class="font-medium"
							>{task.issue?.fields.assignee ? getCompactName(task.issue?.fields.assignee?.displayName) : 'No'}</span
						>
						<span class="text-xs text-dimmed">Asignee</span>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
