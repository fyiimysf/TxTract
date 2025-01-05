<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';

	let tabNumber = $state(1);
</script>

<!-- lg -->

<div class="btm-nav btm-nav-lg z-50 fixed bottom-0 w-full bg-transparent shadow-lg">
	<!-- svelte-ignore a11y_missing_attribute -->
	<button
		onclick={() => {
			tabNumber = 0;
		}}
	>
		<a href="/settings">
			<Icon icon="line-md:cog" class="h-8 w-8" />
		</a>
	</button>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button onclick={() => (tabNumber = 1)}> </button>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		onclick={() => {
			tabNumber = 2;
		}}
	>
		<a href="/saved" onclick={() => (tabNumber = 2)}>
			<Icon icon="line-md:folder" class="h-8 w-8" />
		</a>
	</button>
</div>
