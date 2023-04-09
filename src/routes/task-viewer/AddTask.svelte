<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	export let onClose: () => void;

	let loading = false;

	const submitAddTask: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') onClose();
			await update();
			loading = false;
		};
	};
</script>

<form
	method="post"
	action="?/addTask"
	use:enhance={submitAddTask}
	class="absolute top-0 flex w-full flex-col gap-2 bg-sky-100 px-3 py-2 shadow-lg sm:flex-row"
	transition:fly={{ y: -150 }}
>
	<input id="appCode" name="appCode" hidden value={$page.url.searchParams.get('appCode')} />
	<input id="route" name="route" hidden value={$page.url.searchParams.get('route')} />
	<div class="flex items-center gap-2">
		<input
			id="issueKey"
			name="issueKey"
			placeholder="Issue key"
			type="text"
			required
			disabled={loading}
			class="min-w-0 rounded-md border-[1px] border-sky-500 px-2 py-1 text-sm outline-none focus:border-sky-600"
			value={$page.form?.data?.issueKey || ''}
		/>
		<button type="button" on:click={onClose} class="flex text-sky-500"
			><iconify-icon icon="material-symbols:close-rounded" width={18} /></button
		>
	</div>
	<div class="flex justify-between px-1">
		<div class="flex items-center gap-2">
			<input
				id="removeOnCompleted"
				name="removeOnCompleted"
				type="checkbox"
				class="h-4 w-4"
				disabled={loading}
				checked={$page.form?.data?.removeOnCompleted || false}
			/>
			<label for="removeOnCompleted" class="text-sm">Remove on completed</label>
		</div>
		<button
			disabled={loading}
			class="rounded-md bg-sky-500 px-4 font-semibold text-white disabled:bg-gray-400"
			type="submit">Add</button
		>
	</div>
</form>
