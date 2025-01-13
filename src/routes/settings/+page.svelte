<script lang="ts">
	import Skeleton from '$lib/Skeleton.svelte';
	import { settings } from '$lib/stores.svelte';
	import { fade, fly } from 'svelte/transition';

</script>

<div data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'} transition:fade class="settings-page">
	<Skeleton/>
</div>
