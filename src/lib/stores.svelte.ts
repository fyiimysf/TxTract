// export const cardData = $state({
//     image: 'https://source.unsplash.com/random/400x300',
//     title: '',
//     time: Date.now().toString(),

import { LocalStorage } from "./storage.svelte";

// });
export const theme = new LocalStorage('theme', ['lightTheme', 'darkTheme']);
export const FabFunc = $state(function(){});
export const output = $state({value: ''});
export const cardData = $state( {
    image: "https://source.unsplash.com/random/400x300",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", month: "2-digit", year: "numeric", day: "2-digit", hour12: true, }),
    content: '',
});

export const cards = new LocalStorage('cards', []);