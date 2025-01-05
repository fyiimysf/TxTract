<script lang="ts">
	import '../app.css';
	import Icon from '@iconify/svelte';
	import { cards } from './stores.svelte';
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
	<div transition:fly class="card absolute z-50 my-72 w-96 bg-neutral align-bottom text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{title}</h2>
			<p>{message}</p>
			<div class="card-actions justify-end">
				<button
					onclick={() => {
						yesAction();
                        show = false;
					}}
					class="btn btn-primary">{yesText}</button
				>
				<button
					onclick={() => {
						noAction();
                        show = false;
					}}
					class="btn btn-secondary">{noText}</button
				>
			</div>
		</div>
	</div>
{/if}
