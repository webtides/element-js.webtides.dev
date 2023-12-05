module.exports = ({ env }) => ({
	plugins: [
		require('postcss-import'),
		require('tailwindcss')({ config: 'tailwind.config.js' }),
		require('postcss-nested'),
		require('autoprefixer'),
		env === 'production' ? require('cssnano')() : false,
	],
	inject: false,
	minimize: false,
	sourceMap: true,
});
