<script lang="ts">
	import { navigating } from '$app/stores';
	export let completed: 0 | 1 | null;
	export let direction: 'asc' | 'desc';
	export let onChangeCompleted: (value: 0 | 1 | null) => void;
	export let onChangeDirection: (value: 'asc' | 'desc') => void;
</script>

<div class="mb-2 flex items-center justify-between bg-sky-100 px-2 py-2">
	<div class="flex items-center gap-2">
		<button
			disabled={Boolean($navigating)}
			on:click={() => onChangeCompleted(completed === null ? 0 : null)}
			class="rounded-xl border-[1px] border-sky-500 px-2 font-semibold text-sky-500"
			class:bg-sky-500={completed === null}
			class:text-white={completed === null}>All</button
		>
		<button
			disabled={Boolean($navigating)}
			on:click={() => onChangeCompleted(completed === 1 ? 0 : 1)}
			class="rounded-xl border-[1px] border-sky-500 px-2 font-semibold text-sky-500"
			class:bg-sky-500={completed === 1}
			class:text-white={completed === 1}>Completed</button
		>
	</div>
	<div class="flex items-center">
		<button disabled={Boolean($navigating)} on:click={() => onChangeDirection('asc')} class="flex"
			><iconify-icon icon="ph:arrow-bend-left-up-bold" class={direction === 'asc' ? 'text-sky-500' : ''} /></button
		>
		<button disabled={Boolean($navigating)} on:click={() => onChangeDirection('desc')} class="flex"
			><iconify-icon icon="ph:arrow-bend-right-down-bold" class={direction === 'desc' ? 'text-sky-500' : ''} /></button
		>
	</div>
</div>
