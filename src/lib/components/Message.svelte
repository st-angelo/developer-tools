<script lang="ts">
	import type { FormMessage } from '$lib/data/types/general';

	export let message: FormMessage;
	export let onClose: () => void;

	function getColorClasses(type: FormMessage['type']) {
		switch (type) {
			case 'error':
				return 'bg-red-100 text-red-600';
			case 'warning':
				return 'bg-orange-100 text-orange-600';
			default:
				return 'bg-lime-100 text-lime-600';
		}
	}
</script>

<div class={`flex items-center justify-between rounded-md p-2 shadow-md ${getColorClasses(message.type)}`}>
	<div class="flex items-center gap-2 rounded-md">
		{#if message.type === 'error'}
			<iconify-icon icon="material-symbols:error-rounded" width={20} />
		{:else if message.type === 'warning'}
			<iconify-icon icon="material-symbols:warning-rounded" width={20} />
		{:else}
			<iconify-icon icon="material-symbols:info-rounded" width={20} />
		{/if}
		<span class="text-sm">{@html message.content}</span>
	</div>
	<button class="flex" on:click={onClose}><iconify-icon icon="material-symbols:close-rounded" width={20} /></button>
</div>
