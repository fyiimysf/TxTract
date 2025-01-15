import { cards } from '$lib/stores.svelte';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    console.log(params.cardPage);
    return cards.current[params.cardPage];
}) satisfies PageLoad;