<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	const themes = ['lightTheme, darkTheme'];
	let selectedTheme = writable('darkTheme');

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			selectedTheme.set(savedTheme);
		}
	});

	selectedTheme.subscribe((value) => {
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem('theme', value);
	});

	function handleThemeChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedTheme.set(target.value);
	}
</script>

<div transition:fade class="settings-page">
	<h1>Settings</h1>
	<div class="theme-toggle">
		<label for="theme-select">Choose Theme:</label>
		<select id="theme-select" on:change={handleThemeChange}>
			{#each themes as theme}
				<option value={theme}>{theme}</option>
			{/each}
		</select>
	</div>
	<div class="other-settings">
		<h2>Other Settings</h2>
		
		<label class="flex cursor-pointer gap-2">
			<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  stroke-width="2"
			  stroke-linecap="round"
			  stroke-linejoin="round">
			  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
			<input type="checkbox" value="lightTheme" class="toggle theme-controller" />
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  width="20"
			  height="20"
			  viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  stroke-width="2"
			  stroke-linecap="round"
			  stroke-linejoin="round">
			  <circle cx="12" cy="12" r="5" />
			  <path
				d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
			</svg>
		  </label>
		<!-- Add more settings options here -->
	</div>
</div>

<style>
	.settings-page {
		padding: 1rem;
	}
	.theme-toggle {
		margin-bottom: 1rem;
	}
</style>
