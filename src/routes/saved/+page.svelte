<script lang="ts">
  import Skeleton from '$lib/Skeleton.svelte';

	import { fade, fly } from 'svelte/transition';
    import type { PageData } from '../saved/$types';

    let { data }: { data: PageData } = $props();
</script>


<div transition:fade>
  
   <Skeleton/>
</div>