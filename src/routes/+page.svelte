<script lang="ts">
	import { scale } from 'svelte/transition';
	import Animate from '../lib/components/Animate.svelte';

	export let data;
</script>

<Animate>
	<div class="flex min-h-screen w-full items-center justify-center" in:scale>
		<div class="flex flex-col items-center justify-center gap-5 rounded-lg p-10 shadow-lg drop-shadow-lg">
			<h2 class="text-lg font-bold">Developer widgets</h2>
			<div class="flex flex-col gap-3">
				{#each data.tools as tool}
					<a class="rounded-lg bg-green-600 px-5 py-3 font-bold text-white" href={tool.route}>{tool.name}</a>
				{/each}
			</div>
		</div>
	</div>
</Animate>
