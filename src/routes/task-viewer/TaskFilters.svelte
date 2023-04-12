<script lang="ts">
	import { navigating } from '$app/stores';
	export let completed: 0 | 1 | null;
	export let direction: 'asc' | 'desc';
	export let onChangeCompleted: (value: 0 | 1 | null) => void;
	export let onChangeDirection: (value: 'asc' | 'desc') => void;
</script>

<div class="flex items-center justify-between p-5 pb-3">
	<div class="flex items-center gap-1 text-sm text-dimmed">
		<button
			disabled={Boolean($navigating)}
			on:click={() => onChangeCompleted(completed === null ? 0 : null)}
			class="rounded-lg border-[1px] px-3 py-1 outline-none hover:border-dimmed focus:border-dimmed"
			class:border-withered={completed !== null}
			class:bg-theme={completed === null}
			class:text-white={completed === null}
			class:border-theme-dark={completed === null}
			class:hover:bg-theme-dark={completed === null}
			class:focus:bg-theme-dark={completed === null}
			class:hover:border-theme-dark={completed === null}
			class:focus:border-theme-dark={completed === null}>ALL</button
		>
		<button
			disabled={Boolean($navigating)}
			on:click={() => onChangeCompleted(completed === 1 ? 0 : 1)}
			class="rounded-lg border-[1px] px-3 py-1 outline-none hover:border-dimmed focus:border-dimmed"
			class:border-withered={completed !== 1}
			class:bg-theme={completed === 1}
			class:text-white={completed === 1}
			class:border-theme-dark={completed === 1}
			class:hover:bg-theme-dark={completed === 1}
			class:focus:bg-theme-dark={completed === 1}
			class:hover:border-theme-dark={completed === 1}
			class:focus:border-theme-dark={completed === 1}>COMPLETED</button
		>
	</div>
	<div class="flex items-center text-dimmed">
		<button
			disabled={Boolean($navigating)}
			on:click={() => onChangeDirection('asc')}
			class="flex outline-none hover:text-accent focus:text-accent"
			class:text-theme={direction === 'asc'}
			class:hover:text-theme-dark={direction === 'asc'}
			class:focus:text-theme-dark={direction === 'asc'}><iconify-icon icon="ph:arrow-bend-left-up-bold" /></button
		>
		<button
			disabled={Boolean($navigating)}
			on:click={() => onChangeDirection('desc')}
			class="flex outline-none hover:text-accent focus:text-accent"
			class:text-theme={direction === 'desc'}
			class:hover:text-theme-dark={direction === 'desc'}
			class:focus:text-theme-dark={direction === 'desc'}><iconify-icon icon="ph:arrow-bend-right-down-bold" /></button
		>
	</div>
</div>
