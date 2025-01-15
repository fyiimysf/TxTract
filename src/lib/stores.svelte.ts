// export const cardData = $state({
//     image: 'https://source.unsplash.com/random/400x300',
//     title: '',
//     time: Date.now().toString(),

import { LocalStorage } from "./storage.svelte";

// });
export const theme = $state({value: ''});
export const FabFunc = $state(function(){});
export const output = $state({value: ''});
export const cardData = $state( {
    image: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", month: "2-digit", year: "numeric", day: "2-digit", hour12: true, }),
    content: '',
    index: 0
});
export const imgSrc: any = $state({ img: null });
export const uploadImage = $state({img: null});
export const cards = new LocalStorage('cards', []);
export const settings = new LocalStorage('settings', {darkMode: true});
