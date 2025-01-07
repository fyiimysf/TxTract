<script lang="ts">
	import BottomBar from '$lib/BottomBar.svelte';

	import TopBar from '$lib/TopBar.svelte';

	import '../app.css';
	import Skeleton from '$lib/Skeleton.svelte';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<!-- svelte-ignore node_invalid_placement_ssr -->
	<TopBar />

	{#await children}
		<Skeleton />
	{:then content}
		{@render content()}
	{:catch error}
		<h1>Error: {error.message}</h1>
	{/await}

	<!-- {#if page.route.id === '/'}
		<BottomBar />
	{/if} -->
</div>
