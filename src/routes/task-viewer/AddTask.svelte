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
	class="absolute top-5 flex w-full flex-col gap-5 rounded-lg bg-white p-5 shadow-xl"
	transition:fly|local={{ y: -150, duration: 200 }}
>
	<div class="flex justify-between">
		<h2 class="text-xl font-medium">Link an issue</h2>
		<button
			type="button"
			on:click={onClose}
			class="rounded-fulloutline-none flex h-7 w-7 items-center justify-center rounded-full hover:bg-theme-faded focus:bg-theme-faded"
			><iconify-icon icon="ph:x-bold" /></button
		>
	</div>
	<input id="appCode" name="appCode" hidden value={$page.url.searchParams.get('appCode')} />
	<input id="route" name="route" hidden value={$page.url.searchParams.get('route')} />
	<div class="flex flex-col gap-1">
		<label for="issueKey" class="font-medium">Issue key*</label>
		<input
			id="issueKey"
			name="issueKey"
			placeholder="Enter key here"
			type="text"
			required
			disabled={loading}
			class="min-w-0 rounded-md bg-faded px-5 py-3 outline-none hover:bg-gray-100  focus:bg-gray-100"
			value={$page.form?.data?.issueKey || ''}
		/>
	</div>
	<div class="flex items-center gap-2">
		<div class="relative h-5 w-5">
			<input
				id="removeOnCompleted"
				name="removeOnCompleted"
				type="checkbox"
				class="peer h-full w-full appearance-none rounded-md bg-faded"
				disabled={loading}
				checked={$page.form?.data?.removeOnCompleted || false}
			/>
			<svg height="20" width="20" class="pointer-events-none absolute left-0 top-0 fill-white peer-checked:fill-theme">
				<circle cx="10" cy="10" r="4" />
			</svg>
		</div>
		<label for="removeOnCompleted" class="">Remove on completion</label>
	</div>
	<button
		disabled={loading}
		class="rounded-lg bg-theme py-2 text-white outline-none hover:bg-theme-dark focus:bg-theme-dark disabled:bg-gray-500"
		type="submit">Link</button
	>
</form>
