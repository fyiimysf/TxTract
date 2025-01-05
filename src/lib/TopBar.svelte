<script lang="ts">
	import Dialogue from './Dialogue.svelte';

	import Menu from './Menu.svelte';

	import '../app.css';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	import Modal from './Modal.svelte';
	import { cards } from './stores.svelte';
	let rightIconAction = () => {};
	let rightIcon = $state('line-md:file-upload');
	let isback: true | false = $state(false);
	let dialogueOpen: true | false = $state(false);
	let title: string | null = $state('TXTract');
	const openModal = () => {
		const my_modal_5 = document.getElementById('my_modal_5');
		if (my_modal_5) {
			(my_modal_5 as HTMLDialogElement).showModal();
		}
	};
	$effect(() => {
		if (page.route.id === '/') {
			isback = false;
			title = 'TXTract';
			rightIconAction = () => {
				openModal();
			};
			rightIcon = 'line-md:file-upload';
		}
		if (page.route.id === '/settings') {
			isback = true;
			title = 'Settings';
			rightIconAction = () => {};
			rightIcon = 'line-md:moon-filled';
		}

		if (page.route.id === '/saved') {
			isback = true;
			title = 'Saved';
			rightIconAction = () => {
				dialogueOpen = !dialogueOpen;
			};
			rightIcon = 'line-md:folder-cancel';
		}
	});
</script>

<div class="navbar bg-base-100">
	{#if isback}
		<div class="flex-none">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button class="btn btn-square btn-ghost">
				<a href="/">
					<Icon icon="line-md:arrow-left" class="h-8 w-8" />
				</a>
			</button>
		</div>
	{/if}
	<div class={`flex-auto ${isback ? 'justify-center' : ''}`}>
		<!-- svelte-ignore a11y_missing_attribute -->
		<a class="btn btn-ghost text-2xl">{title}</a>
	</div>
	<div class="flex-none">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			onclick={() => {
				rightIconAction();
			}}
			class="btn btn-square btn-ghost"
		>
			<Icon icon={rightIcon} class="h-8 w-8" />
		</button>
	</div>
	<Modal />
</div>
<Dialogue 
	show={dialogueOpen}
	title="DELETE ALL SAVED SCANS!!!"
	message = "Are You sure u wana delete all scans?"
	yesText="PURGE EM" 
	noText="NUH UH"
	yesAction={() => {
		dialogueOpen = false;
		cards.current = [];
	}}
	noAction={() => {
		dialogueOpen = false;
	}}
	
/>
