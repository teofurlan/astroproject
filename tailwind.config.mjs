/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				hint: '#d0d0d0',
				selected: '#2fafaf',
				background: '#e5e5e5',
				statusbar: '#676363',
				title: '#AF2F2F',
				general: '#272424',
			},
			fontFamily: {
				roboto: ['Roboto', 'sans serif'],
				notosanssc: ['Noto Sans SC', 'sans serif']
			}
		}
	},
	plugins: [],
}
