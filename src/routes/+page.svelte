<script lang="ts">
	import { scale } from 'svelte/transition';
	import Animate from '../lib/components/Animate.svelte';

	export let data;
</script>

<Animate>
	<div class="flex h-full items-center justify-center">
		<div class="container-shadow flex w-full flex-col gap-5 rounded-lg bg-white p-10 pb-32">
			<h2 class="text-2xl font-bold">DevTools</h2>
			<p>
				A collection of tools meant to improve the experience of developers and testers alike. You can browse them
				below.
			</p>
			<div class="flex flex-col gap-3">
				{#each data.tools as tool}
					<a
						class="flex items-center justify-between rounded-lg border-2 border-theme bg-white px-5 py-3 font-bold text-theme outline-none hover:bg-theme hover:text-white focus:bg-theme focus:text-white"
						href={tool.route}>{tool.name}<iconify-icon icon="material-symbols:arrow-right-alt-rounded" width={18} /></a
					>
				{/each}
				<span class="mt-5 text-center text-sm font-medium text-theme">And more to come!</span>
			</div>
		</div>
	</div>
</Animate>
