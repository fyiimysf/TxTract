<script lang="ts">
	import Icon from '@iconify/svelte';

	import { imgSrc, uploadImage } from './stores.svelte';

	let File: any = $state(null);
	const openModal = () => {
		const my_modal_5 = document.getElementById('my_modal_5');
		if (my_modal_5) {
			(my_modal_5 as HTMLDialogElement).showModal();
		}
	};

	let {
		title = 'Title',
		subText = 'Subtext',

		uploadType = true
	}: { title?: string; subText?: string; uploadType?: boolean | false } = $props();
</script>

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<center>
			<h3 class="text-2xl font-bold">{title}</h3>
			<p class="py-4">{subText}</p>
			{#if uploadType}
				<!-- svelte-ignore event_directive_deprecated -->
				<input
					type="file"
					class="file-input file-input-lg w-full max-w-xs"
					onchange={(e) => {
						const file = (e.target as HTMLInputElement).files?.[0];
						if (file) {
							File = URL.createObjectURL(file);
						}
					}}
					accept="image/png,image/jpeg,image/jpg"
				/>
			{/if}
			<div class="modal-action">
				<form method="dialog">
					<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
					{#if uploadType}
						<button
							onclick={() => {
								imgSrc.img = File;
								console.log(uploadImage.img);
							}}
							class="btn btn-block bg-emerald-500 text-white"
						>
							<Icon icon="ic:outline-cloud-upload" class="h-6 w-6" />
							Upload</button
						>
					{:else if uploadType === false}
						<div class="flex justify-center space-x-6">
							<button class="btn btn-block bg-green-600 text-white">Yes</button>
							<button class="btn btn-block bg-red-600 text-white">No</button>
						</div>
					{/if}
					<!-- if there is a button in form, it will close the modal -->
				</form>
			</div>
			<br />
			<br />
		</center>
	</div>
</dialog>
