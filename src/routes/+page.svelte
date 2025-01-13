<script lang="ts">
	import Modal from '$lib/Modal.svelte';

	import EasyCamera from '@cloudparker/easy-camera-svelte';
	import FAB from '$lib/FAB.svelte';
	import FAB_2 from '$lib/FAB_2.svelte';
	import { createWorker } from 'tesseract.js';

	import Icon from '@iconify/svelte';

	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/state';
	import BottomBar from '$lib/BottomBar.svelte';
	import { onMount } from 'svelte';
	import { cardData, cards, output, settings } from '$lib/stores.svelte';
	import { text } from '@sveltejs/kit';

	let camera: EasyCamera;
	let mirrorDisplay = $state(false);
	let useFrontCamera = $state(false);
	let camPaused = $state(false);
	let imgSrc: any = $state();
	let camDevice: any = $state();
	let textboxHeight = $state('h-32');
	let fabIcon = $state('line-md:cellphone-screenshot');
	let boolToast = $state(false);
	let heartIcon = $state('line-md:heart');
	$effect(() => {
		if (output.value !== '') {
			textboxHeight = ' h-40';
		}
	});

	const handleImage = async () => {
		let imageData = await camera.captureImage();
		camera.pause();
		imgSrc = imageData;
		img2text(imageData);
		// console.log(imageData);
		camPaused = true;
	};

	const resumeImage = async () => {
		camera.resume();
		output.value = '';
		camPaused = false;
		fabIcon = 'line-md:cellphone-screenshot';
		textboxHeight = 'h-32';
	};

	function showToast() {
		if (!boolToast) {
			setTimeout(() => {
				{
					boolToast = true;
				}
			}, 10);
			boolToast = false;
		}
	}

	async function addToSaves() {
		cardData.image = imgSrc;
		cardData.content = output.value;
		cardData.time = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			month: '2-digit',
			year: 'numeric',
			day: '2-digit',
			hour12: true
		});
		cardData.index = cards.current.length;
		cards.current.push(cardData);
		// console.log(JSON.stringify(cards.current));
		showToast();
		
	}

	// function extractImageFile(imageData: string) {
	// 	const base64Image = imageData.split(';base64,').pop();
	// 	const imageBuffer = Buffer.from(base64Image, 'base64');
	// 	return new File([imageBuffer], 'image.jpg', { type: 'image/jpeg' });
	// }

	function img2text(image: any) {
		(async () => {
			const worker = await createWorker('eng');
			const ret = await worker.recognize(image);
			// console.log(ret.data.text);
			output.value = ret.data.text;
			await worker.terminate();
		})();
	}

	const handleVideo = async () => {
		let blob = await camera.startVideoRecording();
		if (blob) {
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'video.mp4';
			document.body.appendChild(a);
			a.click();
		}
	};
</script>

<div
	data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}
	class="container h-screen"
	transition:fade
>
	{#if boolToast}
		{@render TopToast('Added to Favorites', 'line-md:thumbs-up')}
	{/if}
	<div class="">
		<div class="card flex-col px-2">
			<center class="flex items-center justify-center">
				<div class="outline-3 card outline outline-offset-2">
					<EasyCamera
						bind:this={camera}
						autoOpen
						style="border-radius:17px; margin-bottom: %;"
						{mirrorDisplay}
						{useFrontCamera}
					/>
				</div>
			</center>
			<div class="flex justify-evenly py-4">
				{#if output.value !== ''}
					<!-- After Scan Buttons -->
					<button
						class="btn btn-circle w-40"
						onclick={() => {
							addToSaves();
							heartIcon = 'line-md:heart-filled';
						}}
					>
						<Icon icon={heartIcon} class="h-10 w-10" />
					</button>
					<button
						onclick={() => {
							resumeImage();
						}}
						class="btn btn-circle w-40"
					>
						<Icon icon="line-md:rotate-270" class="h-11 w-11" />
					</button>
				{:else if output.value === ''}
					<!-- Before Scan Buttons -->
					<button
						onclick={() => {
							useFrontCamera = !useFrontCamera;
							mirrorDisplay = !mirrorDisplay;
							resumeImage();
						}}
						class="btn btn-circle btn-block mr-4"
					>
						<Icon icon="line-md:round-360" class="h-12 w-12" />
					</button>
				{/if}
			</div>
			<div class="shadow-3xl flex-row items-center justify-stretch">
				<div class=" card">
					<textarea
						disabled
						class="textarea relative {textboxHeight} flex-col"
						placeholder="Text Output">{output.value}</textarea
					>
					<div class="card-actions justify-end">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						{#if output.value !== ''}
							<div class="flex-row items-center justify-center pb-2 pt-2">
								<button
									class="bg-alert btn btn-active btn-sm mr-3"
									onclick={() => {
										resumeImage();
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
	<!-- Open the modal using ID.showModal() method -->

	<Modal></Modal>

	<!-- <div class=" fixed inset-x-1/2 top-3/4 z-50 flex items-center justify-center"> -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- <div class="relative inset-y-16"> -->
	<!-- svelte-ignore a11y_missing_attribute -->
	<!-- {#if output.value === ''}
				<a
					transition:fade
					onclick={() => {
						handleImage();
						fabIcon = 'line-md:loading-twotone-loop';
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
									<p class="text-lg">
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
			{/if}
		</div>
	</div> -->

	<BottomBar {handleImage} />
</div>
{#snippet TopToast(text: any, icon: any)}
	<div class="toast toast-center toast-top z-50 pt-14">
		<div class="alert alert-success">
			<span><Icon {icon} class="h-9 w-9" /> </span>
			<span class="font-bold">{text}</span>
		</div>
	</div>
{/snippet}
