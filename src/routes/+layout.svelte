<script>
	import { fly } from 'svelte/transition';
	import '../app.css';
	import 'iconify-icon';

	export let data;
</script>

{#key data.pathname}
	<div in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
		<slot />
	</div>
{/key}
