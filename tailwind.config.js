/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', 'sans-serif'],
			},
			font: {
				semibold: 500,
			},
			colors: {
				theme: {
					faded: '#dfeddf',
					light: '#bfddbf',
					DEFAULT: '#4B774C',
					dark: '#3c5f3c',
				},
				accent: '#333',
				light: '#7F7F7F',
				dimmed: '#909090',
				withered: '#E1E1E1',
				faded: '#F7F7F7',
				success: '#e2f7f4',
				danger: {
					faded: '#fbf0ec',
					withered: '#f8e2db',
					light: '#f1c8bb',
					DEFAULT: '#C34822',
				},
			},
			screens: {
				xs: '400px',
			},
		},
	},
	plugins: [],
};
