<script lang="ts">
	export let page: number;
	export let size = 5;
	export let total: number;
	export let onPageChange: (value: number) => void;

	$: lastPage = Math.ceil(total / size);
</script>

<div class="flex items-center gap-2">
	<button disabled={page <= 1} class="text-sky-500 disabled:text-gray-500" on:click={() => onPageChange(page - 1)}>
		<iconify-icon icon="solar:map-arrow-left-bold" />
	</button>

	<span class="italic"
		>{(page - 1) * size + 1 <= total ? (page - 1) * size + 1 : total} ... {page * size <= total ? page * size : total} of
		{total}</span
	>

	<button
		disabled={page >= lastPage}
		class="text-sky-500 disabled:text-gray-500"
		on:click={() => onPageChange(page + 1)}
	>
		<iconify-icon icon="solar:map-arrow-right-bold" />
	</button>
</div>
