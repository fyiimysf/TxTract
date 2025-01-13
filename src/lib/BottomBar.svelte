<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';
	import Fab from './FAB.svelte';
	import Fab_2 from './FAB_2.svelte';

	let tabNumber = $state(1);
	let {handleImage} : {handleImage: () => void} = $props();
</script>

<!-- lg -->

<div  class="btm-nav btm-nav-lg fixed bottom-0 z-50 w-full bg-transparent shadow-lg">
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
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mb-28" onclick={() => (tabNumber = 1)}>
		<Fab {handleImage} />
			
			
		</div>
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
