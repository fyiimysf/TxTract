<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';
	import { cards, settings } from './stores.svelte';
	import { fade, fly } from 'svelte/transition';
	let {
		yesAction = () => {},
		noAction = () => {},
		yesText = 'Yes',
		noText = 'No',
		title = 'Title',
		message = 'message',
		show = false
	} = $props();
</script>

{#if show}
	
	
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={()=>{show = false}} class="fixed bg-black z-50 bg-opacity-40 inset-0 flex items-center justify-center" transition:fade>
	<div  class="card rounded-3xl bg-base-100 w-90">
		<div class="card-body items-center text-center">
			<h2 class="card-title text-red-600">{title}</h2>
			<p class="text-red-600">{message}</p>
			<div class="card-actions justify-end">
				<button
				onclick={() => {
					yesAction();
					show = false;
				}}
				class="btn btn-primary">{yesText}</button>
				<button
				onclick={() => {
					noAction();
					show = false;
				}}
				class="btn btn-alert">{noText}</button>
			</div>
		</div>
	</div>
	
</div>
{/if}