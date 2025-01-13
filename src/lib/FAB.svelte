<script lang="ts">
	import Icon from '@iconify/svelte';
	import { output } from './stores.svelte';
	import { fade } from 'svelte/transition';
	let {handleImage} : {handleImage: () => void} = $props();
	let fabIcon = $state('line-md:cellphone-screenshot');
	function CancelButton() {
		fabIcon = 'line-md:cellphone-screenshot';
		output.value = '';
		console.log('Cancelled');
	}
	function PressButton() {
		handleImage();
		fabIcon = 'line-md:loading-twotone-loop';
	}

	$effect(() => {
		if (output.value === '') {
			fabIcon = 'line-md:cellphone-screenshot';
		}
	});
</script>

<div class="relative z-50 flex items-center justify-center">
	<div class="flex-row items-center justify-center">
		{#if output.value === ''}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<a
				transition:fade
				onclick={() => {
					PressButton();
				}}
			>
				<div class="relative z-50 flex items-center justify-center">
					<div class="flex-row">
						<button
							class="mouse h-24 w-36 rounded-3xl bg-green-600 px-4 text-white shadow-lg transition duration-200 ease-in hover:bg-red-700 focus:outline-none active:shadow-2xl"
						>
							<div class="flex flex-col">
								<center>
									<Icon icon={fabIcon} class="h-12 w-12" />
								</center>
								<p  class="text-lg">
									{#if fabIcon !== 'line-md:loading-twotone-loop'}
										Capture
									{:else}
										Extracting
									{/if}
								</p>
							</div>
						</button>
					</div>
				</div>
			</a>
			{#if fabIcon === 'line-md:loading-twotone-loop'}
				
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_missing_attribute -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a
					transition:fade
					class="absolute btn btn-active btn-sm mt-2 w-36 rounded-3xl bg-red-800 px-4 text-white shadow-lg transition duration-200 ease-in hover:bg-red-700 focus:outline-none active:shadow-2xl"
					onclick={() => {
						CancelButton();
					}}
				>
					Cancel
				</a>
			{/if}
		 	
		{/if}
	</div>
</div>
