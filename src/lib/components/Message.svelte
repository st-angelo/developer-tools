<script lang="ts">
	import type { FormMessage } from '$lib/data/types/general';

	export let message: FormMessage;
	export let onClose: () => void;

	function getColorClasses(type: FormMessage['type']) {
		switch (type) {
			case 'error':
				return 'bg-danger';
			case 'warning':
				return 'bg-yellow-500';
			default:
				return 'bg-theme';
		}
	}
</script>

<div class={`flex items-center justify-between rounded-md p-4 text-white shadow-md ${getColorClasses(message.type)}`}>
	<div class="flex items-center gap-2 rounded-md">
		<span class="text-sm">{@html message.content}</span>
	</div>
	<button class="flex items-center justify-center rounded-full p-1 text-white" on:click={onClose}
		><iconify-icon icon="material-symbols:close-rounded" /></button
	>
</div>
