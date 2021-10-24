module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				orange: {
					DEFAULT: '#EE6C4D',
					light: '#f6b3a2'
				},
				blue: {
					lightest: '#E0FBFC',
					light: '#98C1D9',
					DEFAULT: '#3D5A80',
					dark: '#293241'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
