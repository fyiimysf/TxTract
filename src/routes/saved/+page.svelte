<script lang="ts">
	
	import { cards, settings } from '$lib/stores.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from '../saved/$types';
	let { data }: { data: PageData } = $props();

	function deleteCard(card: any) {
		cards.current = cards.current.filter((c: { index: any; }) => c.index !== card.index);
		cards.current.forEach((c: { index: number; }, i: number) => {
			c.index = i;
		});
	}
</script>

<div data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'} class="h-screen flex-col" transition:fade>
	{#if cards.current.length === 0}
		<div class="relative mt-[60%] space-y-4">
			<center>
				<figure class="pt-4">
					<Icon icon="line-md:chat-alert" class="h-[120px] w-[120px] text-base-300" />
				</figure>
				<h2 class="text-2xl text-base-300">No Saved Scans</h2>
				<p class="text-base-300">Save your scans to view them here</p>
			</center>
		</div>
	{:else}
		<div class="p-4 space-y-4">
			{@render SavedCard()}
		</div>
	{/if}

	{#snippet SavedCard()}
		{#each [...cards.current] as card}
		
		<div class="card card-compact bg-base-300 shadow-xl">
				<a href='/saved/{card.index}'>
				<figure class="p-4">
					<!-- svelte-ignore a11y_img_redundant_alt -->
					<img class="rounded-lg" src={card.image} alt="image" />
				</figure>
				</a>
				<div class="card-body">
					<a href='/saved/{card.index}'>
						<h2 class="card-title">{card.time}</h2>
						<p>{card.content}</p>
					</a>
					<div class="card-actions p-4 justify-between">
						<button onclick="{() => {deleteCard(card)}}" class="btn btn-ghost btn-circle btn-warning" aria-label="delete">
							
								<Icon icon="line-md:close-circle-filled" class="h-10 w-10" />
							
						</button>
						
					
						
						<button onclick={()=>{
							navigator.clipboard.writeText(card.content).then(() => {
								console.log('Text copied to clipboard');
							}).catch(err => {
								console.error('Could not copy text: ', err);
							});
						}} class="btn btn-ghost btn-circle btn-warning">
								<Icon icon="line-md:text-box-multiple" class="h-10 w-10" />
						</button>
						
					</div>
				</div>
			</div>
		{/each}
	{/snippet}
</div>
