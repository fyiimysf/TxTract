<script lang="ts">
	import BottomBar from '$lib/BottomBar.svelte';

	import TopBar from '$lib/TopBar.svelte';

	import '../app.css';
	import Skeleton from '$lib/Skeleton.svelte';
	import { page } from '$app/state';
	import { settings } from '$lib/stores.svelte';
	let { children } = $props();
</script>

	<div data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'} class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<!-- svelte-ignore node_invalid_placement_ssr -->
		<TopBar />
		
		{#await children}
		<Skeleton />
		{:then content}
		<div data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'} class="pt-4">
			{@render content()}
		</div>
		{:catch error}
		<div class="flex flex-col items-center justify-center h-full">
			<svg class="w-12 h-12 mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
			</svg>
			<h1 class="text-2xl font-bold">Error: {error.message}</h1>
			<p class="text-gray-500">Page not found</p>
		</div>
		{/await}
		
		<!-- {#if page.route.id === '/'}
		<BottomBar />
		{/if} -->
	</div>
	