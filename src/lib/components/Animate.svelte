<script lang="ts">
	import { onMount } from 'svelte';

	let show = false;

	onMount(() => (show = true));
</script>

{#if show}
	<slot />
{/if}
