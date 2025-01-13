<script lang="ts">
	import { output } from '$lib/stores.svelte';
	import EasyCamera from '@cloudparker/easy-camera-svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
    import type { PageData } from './$types';
	import { page } from '$app/state';
    let { data, cardPageData }: { data: PageData, cardPageData: any } = $props();


 $effect(() => {
    console.log(data);
});


</script>

<div class="h-screen flex-col" transition:fade>

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
			}}
					>
					<Icon icon='line-md:heart-filled' class="h-10 w-10" />
				</button>
				<button
				onclick={() => {
				}}
						class="btn btn-circle w-40"
						>
						<Icon icon="line-md:rotate-270" class="h-11 w-11" />
					</button>
					
				</div>
				<div class="shadow-3xl flex-row items-center justify-stretch">
					<div class=" card">
						<textarea
						disabled
						class="textarea relative h-[150px] text-base-content flex-col"
						placeholder="Text Output">{data.content}</textarea
						>
						<div class="card-actions justify-end">
							<!-- svelte-ignore a11y_consider_explicit_label -->
							{#if output.value !== ''}
							<div class="flex-row items-center justify-center pb-2 pt-2">
								<button
								class="bg-alert btn btn-active btn-sm mr-3"
								onclick={() => {
								}}
								>
								<Icon icon="line-md:chat-off" class="h-6 w-6 text-red-400"></Icon>
							</button>
							
							<button class="btn btn-active btn-sm mr-4">
								<Icon icon="line-md:clipboard-arrow" class="h-6 w-6 text-green-400"></Icon>
							</button>
						</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>