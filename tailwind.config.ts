import type { Config } from 'tailwindcss';
import daisyui from "daisyui"
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {


		extend: {}
	},
	daisyui: {
		themes: [

			{
				darkTheme: {
					"primary": "#ff00a0",
					"primary-content": "#160009",
					"secondary": "#00d536",
					"secondary-content": "#001001",
					"accent": "#0098a8",
					"accent-content": "#00080a",
					"neutral": "#160307",
					"neutral-content": "#ccc5c6",
					"base-100": "#212829",
					"base-200": "#1b2122",
					"base-300": "#161b1c",
					"base-content": "#cecfd0",
					"info": "#087afa",
					"info-content": "#000515",
					"success": "#007f00",
					"success-content": "#d2e6d0",
					"warning": "#d95700",
					"warning-content": "#110300",
					"error": "#ff1054",
					"error-content": "#160002",
				},
				lightTheme: {
					"primary": "#6f00ff",
					"primary-content": "#dcd9ff",
					"secondary": "#0070ff",
					"secondary-content": "#000416",
					"accent": "#00bf00",
					"accent-content": "#000d00",
					"neutral": "#2a2621",
					"neutral-content": "#d0cfcd",
					"base-100": "#fff4ff",
					"base-200": "#ded4de",
					"base-300": "#beb5be",
					"base-content": "#161416",
					"info": "#0090ff",
					"info-content": "#000716",
					"success": "#23d04b",
					"success-content": "#001002",
					"warning": "#ff6600",
					"warning-content": "#160300",
					"error": "#ff4d63",
					"error-content": "#160203",
				},

			},
		],
	},
	plugins: [
		daisyui,
	]
} satisfies Config;
