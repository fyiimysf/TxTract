<script lang="ts">
	import { cards, output } from '$lib/stores.svelte';
	import EasyCamera from '@cloudparker/easy-camera-svelte';
	import Icon from '@iconify/svelte';
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	let { data, cardPageData }: { data: PageData; cardPageData: any } = $props();
	let boolToast = $state(false);
	let toastdata = $state([
		{
			text: 'Deleted from Saved',
			icon: 'line-md:minus-circle',
			color: 'alert alert-warning'
		},
		{
			text: 'Copied to Clipboard',
			icon: 'line-md:clipboard-arrow',
			color: 'alert alert-info'
		}
	]);
	let toastIndex = $state(0);

	function showToast(index: number) {
		toastIndex = index;
		boolToast = true;
		setTimeout(() => {
			boolToast = false;
		}, 1000);
	}

	$effect(() => {
		console.log(data);
	});

	async function deleteCard() {
		cards.current = cards.current.filter((c: { index: any }) => c.index !== data.index);
		cards.current.forEach((c: { index: number }, i: number) => {
			c.index = i;
		});
	}
</script>

<div class="h-screen flex-col" transition:fade>
	{#if boolToast}
		{@render TopToast(
			toastdata[toastIndex].text,
			toastdata[toastIndex].icon,
			toastdata[toastIndex].color
		)}
	{/if}
	<div class="">
		<div class="card flex-col px-2">
			<center class="flex items-center justify-center">
				<figure class="pt-4">
					<!-- svelte-ignore a11y_img_redundant_alt -->
					<img class="rounded-lg" src={data.image} alt="image" />
				</figure>
			</center>
			
			<div class="flex justify-evenly py-4">
				
				<!-- After Scan Buttons -->
				<button
					class="btn btn-circle w-40"
					onclick={() => {
						deleteCard();
					}}
				>
					<a href="/saved">
						<Icon icon="line-md:close" class="h-10 w-10" />
					</a>
				</button>
				<button
					onclick={() => {
						navigator.clipboard
							.writeText(data.content)
							.then(() => {
								console.log('Text copied to clipboard');
								showToast(1);
							})
							.catch((err) => {
								console.error('Could not copy text: ', err);
							});
					}}
					class="btn btn-circle w-40"
				>
					<Icon icon="line-md:text-box-multiple" class="h-9 w-9" />
				</button>
			</div>
			<div class="shadow-3xl flex-row items-center justify-stretch">
				<div class=" card">
					<textarea
						disabled
						class="textarea relative h-[150px] flex-col text-base-content"
						placeholder="Text Output">{data.content}</textarea
					>
				</div>
			</div>
			
		</div>
	</div>
</div>

{#snippet TopToast(text: any, icon: any, color: any)}
	<div class="toast toast-center toast-top z-50 pt-14" transition:fly={{ y: -50 }}>
		<div class={color}>
			<span><Icon {icon} class="h-9 w-9" /> </span>
			<span class="font-bold">{text}</span>
		</div>
	</div>
{/snippet}
