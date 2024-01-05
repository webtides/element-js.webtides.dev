import path from 'path';
import DocsService from './services/DocsService';

const SERVER_PORT = process.env.SERVER_PORT || 3005;

export default {
	port: SERVER_PORT,

	build: {
		output: '.build',

		server: {
			resolveNodeModules: ['@webtides/element-js', 'flexsearch'],
		},
	},

	pages: {
		input: [path.join(process.cwd(), 'views/pages')],
		factory: '@webtides/luna-renderer/lib/element-js/vanilla',
	},

	layouts: {
		input: [path.join(process.cwd(), 'views/layouts')],
	},

	api: {
		input: [path.join(process.cwd(), 'api')],
	},

	components: {
		bundles: [
			{
				input: path.join(process.cwd(), 'views/components'),
				output: 'assets',

				styles: {
					output: 'assets/css/base.css',
					// plugins: () => []
				},
				factory: '@webtides/luna-renderer/lib/element-js/vanilla',
			},
		],
	},

	hooks: {
		input: [path.join(process.cwd(), 'hooks')],
	},

	assets: {
		styles: {
			bundles: [
				{
					input: [path.join(process.cwd(), 'assets/css/inline.css')],

					output: 'assets/css/inline.css',
					// plugins: () => []
				},
				{
					input: [path.join(process.cwd(), 'assets/css/fonts.css')],

					output: 'assets/css/fonts.css',
					// plugins: () => []
				},
				{
					input: [path.join(process.cwd(), 'assets/css/prism.css')],

					output: 'assets/css/prism.css',
					// plugins: () => []
				},
			],
		},

		static: {
			sources: [
				// "@fortawesome/fontawesome-pro": "^6.5.1",
				{
					input: 'assets/fa-icons/**/*',
					output: 'assets/fa-icons',
				},
				{
					input: 'assets/favicons/**/*',
					output: 'assets/favicons',
				},
				{
					input: 'assets/fonts/**/*',
					output: 'assets/fonts',
				},
				{
					input: 'assets/images/**/*',
					output: 'assets/images',
				},
				{
					input: 'assets/logo/**/*',
					output: 'assets/logo',
				},
				{
					input: 'node_modules/@webtides/element-js/docs/**/*',
					output: 'content/docs',
				},
				{
					input: 'node_modules/prismjs/prism.js',
					output: 'assets/vendors/prismjs/js/prism.js',
				},
				{
					input: 'node_modules/prismjs/**/*.css',
					output: 'assets/vendors/prismjs/css',
				},
			],
		},
	},

	export: {
		output: '.export',

		api: {
			output: {
				directory: '.api',
				filename: 'api-server.js',
			},
		},

		pages: async (pages) => {
			const docsService = new DocsService();
			const docs = docsService.constructor.loadAllDocsPagesFlat();
			const docsLinks = docs.map((doc) => doc.link);

			return [
				...pages.filter((page) => !page.includes(':')),
				...docsLinks.filter((link) => !link.includes('README')),
			];
		},
	},
};

// TODO: fix layout shift because of table of contents width when navigating pages

// TODO@after: add mobile table of content
// TODO@after: add keyboard support for autocomplete and dropdowns
