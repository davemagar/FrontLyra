/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  lyra: {
			yellow: '#FFF9C4', 
    		yellowLight: '#FDF6E3',  // gris claro
		  },
		},
	  },
	},
	plugins: [],
  }
  