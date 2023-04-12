<script lang="ts">
	export let page: number;
	export let size = 5;
	export let total: number;
	export let onPageChange: (value: number) => void;

	$: lastPage = Math.ceil(total / size);
</script>

<div class="flex w-full items-center justify-between text-xs bg-transparent">
	<span class="pl-2"
		>Showing {(page - 1) * size + 1 <= total ? (page - 1) * size + 1 : total} - {page * size <= total
			? page * size
			: total} out of
		{total} issues</span
	>
	<div class="flex gap-3">
		<button
			disabled={page <= 1}
			class="flex items-center gap-2 rounded-lg px-2 py-1 text-theme outline-none hover:bg-theme-light focus:bg-theme-light disabled:text-gray-500 disabled:hover:bg-gray-100 "
			on:click={() => onPageChange(page - 1)}
		>
			<iconify-icon icon="ph:caret-left-bold" />
			<span>Prev</span>
		</button>

		<button
			disabled={page >= lastPage}
			class="flex items-center gap-2 rounded-lg px-2 py-1 text-theme outline-none hover:bg-theme-light focus:bg-theme-light disabled:text-gray-500 disabled:hover:bg-gray-100"
			on:click={() => onPageChange(page + 1)}
		>
			<span>Next</span>
			<iconify-icon icon="ph:caret-right-bold" />
		</button>
	</div>
</div>
