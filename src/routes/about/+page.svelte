<script lang="ts">
	import { settings } from '$lib/stores.svelte';
	import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
	import { fade, fly } from 'svelte/transition';

    let { data }: { data: PageData } = $props();
</script>

<div transition:fade class="hero h-auto bg-base-200 rounded-3xl " data-theme={settings.current.darkMode ? 'darkTheme' : 'lightTheme'}>
    <div class="hero-content text-center flex-col">
        <div class="max-w-xl p-8 bg-base-100 rounded-2xl shadow-lg">
            <h1 class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About txtract
            </h1>
            <p class="py-6 text-lg text-justify">
                txtract is a modern text extraction and document management application built with Svelte and DaisyUI. 
                This tool helps users efficiently extract, manage, and organize text content from various document formats.
            </p>
            <div class="divider"></div>
            <div class="text-left">
                <h2 class="text-2xl font-semibold mb-4 text-primary">Key Features:</h2>
                <ul class="list-none space-y-3">
                    <li class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Image text extraction 
                    </li>
                    <li class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Clean and intuitive user interface
                    </li>
                    <li class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Modern design with Tailwind CSS
                    </li>
                    <li class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Built with Svelte for optimal performance 
                    </li>
                </ul>
            </div>
            <div class="mt-8">
                <a href="/" class="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform">                   
                        <Icon icon="line-md:chevron-left" class="h-8 w-8" />
                        Back
                </a>
            </div>
        </div>
    </div>
</div>
<br/>