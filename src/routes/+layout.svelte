<script lang="ts">
	import BottomBar from '$lib/BottomBar.svelte';

	import TopBar from '$lib/TopBar.svelte';

	import '../app.css';
	import Skeleton from '$lib/Skeleton.svelte';
	import { page } from '$app/state';
	let { children } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<TopBar/>

	{#await children}
		<Skeleton />
	{:then content}
		{@render children()}
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}

	<!-- {#if page.route.id === '/'}
		<BottomBar />
	{/if} -->
</div>
