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
	import { cardData, cards, output, settings, uploadImage, imgSrc } from '$lib/stores.svelte';
	import { text } from '@sveltejs/kit';

	// svelte-ignore non_reactive_update
	let camera: EasyCamera;
	let mirrorDisplay = $state(false);
	let useFrontCamera = $state(false);
	let camPaused = $state(false);
	let camDevice: any = $state();
	let textboxHeight = $state('h-32');
	let fabIcon = $state('line-md:cellphone-screenshot');
	let boolToast = $state(false);
	let heartIcon = $state('line-md:heart');
	let toastdata = $state([
		{
			text: 'Saved to Folder',
			icon: 'line-md:thumbs-up',
			color: 'alert alert-success'
		},
		{
			text: 'Copied to Clipboard',
			icon: 'line-md:clipboard-arrow',
			color: 'alert alert-info'
		}
	]);
	let toastIndex = $state(0);
	$effect(() => {
		if (output.value !== '') {
			textboxHeight = ' h-40';
		}
	});

	const handleImage = async () => {
		if (imgSrc.img != null) {
			let imageData = imgSrc.img;
			img2text(imageData);
			console.log('Scanning Upload' + uploadImage.img);
			return;
		} else {
			let imageData = await camera.captureImage();
			camera.pause();
			imgSrc.img = imageData;
			img2text(imageData);
			// console.log(imageData);
			camPaused = true;
			console.log('Scanning Photo' + imgSrc.img);
		}
	};

	const resumeImage = async () => {
		output.value = '';
		camPaused = false;
		fabIcon = 'line-md:cellphone-screenshot';
		textboxHeight = 'h-32';
		imgSrc.img = null;
		camera.resume();
	};

	function showToast(index: number) {
		toastIndex = index;
		boolToast = true;
		setTimeout(() => {
			boolToast = false;
		}, 1000);
	}

	async function addToSaves() {
		cardData.image = imgSrc.img;
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
		showToast(0);
	}

	// function extractImageFile(imageData: string) {
	// 	const base64Image = imageData.split(';base64,').pop();
	// 	const imageBuffer = Buffer.from(base64Image, 'base64');
	// 	return new File([imageBuffer], 'image.jpg', { type: 'image/jpeg' });
	// }

	function img2text(image: any) {
		(async () => {
			const worker = await createWorker('eng');
			let ret;
			try {
				ret = await worker.recognize(image);
			} catch (error) {
				console.error('Recognition failed:', error);
				return;
			}
			
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

	const openModal = () => {
		const my_modal_5 = document.getElementById('my_modal_5');
		if (my_modal_5) {
			(my_modal_5 as HTMLDialogElement).showModal();
		}
	};
</script>

<div
	data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}
	class="container h-screen "
	transition:fade
>
	{#if boolToast}
		{@render TopToast(
			toastdata[toastIndex].text,
			toastdata[toastIndex].icon,
			toastdata[toastIndex].color
		)}
	{/if}
	<div data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}>
		<div class="card flex-col px-2" data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}>
			<center class="flex items-center justify-center" data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}>
				<div class="outline-3 rounded-3xl outline" data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}>
					{#if imgSrc.img != null}
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img src={imgSrc.img} alt="image" />
					{:else}

							<EasyCamera
							bind:this={camera}
							autoOpen
							style="border-radius:17px; margin-bottom: %;"
							{mirrorDisplay}
							{useFrontCamera}
							/>
					{/if}
				</div>
			</center>
			<div class="flex justify-evenly py-4">
				{#if output.value !== ''}
					<!-- After Scan Buttons -->
					<button
						class="btn btn-circle w-40"
						onclick={() => {
							addToSaves();
						}}
					>
						<Icon icon='line-md:folder-plus' class="h-10 w-10" />
					</button>
					<button
						onclick={() => {
							resumeImage();
						}}
						class="btn btn-circle w-40"
					>
						<Icon icon="line-md:minus-circle" class="h-10 w-10" />
					</button>
				{:else if output.value === '' && imgSrc.img == null}
					<!-- Before Scan Buttons -->
					<button
					onclick={() => {
						resumeImage();
					}}
						class="btn btn-circle btn-ghost mt-2"
						>
						<a href="/saved" >
							<Icon icon="line-md:folder" class="h-10 w-10" />
						</a>
						
					</button>
					<button
					onclick={() => {
						useFrontCamera = !useFrontCamera;
						mirrorDisplay = !mirrorDisplay;
						resumeImage();
					}}
						class="btn btn-circle w-3/5 mt-2"
						>
						<Icon icon="line-md:round-360" class="h-12 w-12" />
					</button>
					<button
						onclick={() => {
							openModal();
						}}
						class="btn btn-circle btn-ghost mt-2"
					>
					<Icon icon="line-md:file-upload" class="h-10 w-10" />
					</button>
					{:else if imgSrc.img != null}
					<button
						onclick={() => {
							imgSrc.img = null;
							resumeImage();
						}}
						class="btn btn-circle btn-block mt-3"
					>
						<Icon icon="line-md:close-circle-filled" class="h-10 w-10" />
					</button>
				{/if}
			</div>
			<div class="shadow-3xl flex-row items-center justify-stretch">
				<div class=" card">
					{#if output.value !== ''}
						<textarea
							disabled
							class="textarea relative {textboxHeight} flex-col"
							placeholder="Text Output">{output.value}</textarea
						>{/if}
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

								<button
									onclick={() => {
										navigator.clipboard
											.writeText(output.value)
											.then(() => {
												console.log('Text copied to clipboard');
												showToast(1);
											})
											.catch((err) => {
												console.error('Could not copy text: ', err);
											});
									}}
									class="btn btn-active btn-sm mr-4"
								>
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
   {#if output.value === ''}
	<BottomBar {handleImage} />
	{/if}
</div>
{#snippet TopToast(text: any, icon: any, color: any)}
	<div class="toast toast-center toast-top z-50 pt-14" transition:fly={{ y: -50 }}>
		<div class={color}>
			<span><Icon {icon} class="h-9 w-9" /> </span>
			<span class="font-bold">{text}</span>
		</div>
	</div>
{/snippet}
