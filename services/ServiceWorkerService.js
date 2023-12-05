import fs from 'fs';

export default class ServiceWorkerService {
	constructor(docs) {
		this.docsLinks = docs.map((doc) => doc.link);

		// TODO: get these requests dynamically?
		this.assetLinks = [
			// WEB
			'/',
			// DOCS
			...this.docsLinks,
			// CSS
			'/assets/css/inline.css',
			'/assets/css/fonts.css',
			'/assets/css/prism.css',
			'/assets/css/base.css',
			// JS
			'/assets/vendors/prismjs/js/prism.js',
			'/luna.js',
			// FONTS
			'/assets/fonts/inter/web/InterVariable.woff2',
			'/assets/fonts/lexend.woff2',
			'/assets/fonts/inter/web/InterVariable-Italic.woff2',
			// COMPONENTS
			'/assets/docs-nav-toggle.js',
			'/assets/el-icon.js',
			'/assets/docs-legend.js',
			'/assets/docs-search.js',
			'/assets/el-dropdown.js',
			'/assets/TemplateElement-a4500c7b.js',
			'/assets/directives-58098d33.js',
			'/assets/fa-icon-50fa2be8.js',
			// ICONS
			'/assets/fa-icons/solid/bars.svg',
			'/assets/fa-icons/solid/xmark.svg',
			'/assets/fa-icons/solid/magnifying-glass.svg',
			'/assets/fa-icons/solid/sun-bright.svg',
			'/assets/fa-icons/solid/moon-stars.svg',
			'/assets/fa-icons/brands/github.svg',
			'/assets/fa-icons/regular/arrow-left.svg',
			'/assets/fa-icons/regular/arrow-right.svg',
		];
	}

	writeServiceWorkerFile() {
		const content = `
// give your cache a name
const cacheName = 'element-js-sw-cache';

// put the static assets and routes you want to cache here
const filesToCache = ${JSON.stringify(this.assetLinks)};

// the event handler for the activate event
self.addEventListener('activate', (e) => self.clients.claim());

// the event handler for the install event
// typically used to cache assets
self.addEventListener('install', (e) => {
	e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

// the fetch event handler, to intercept requests and serve all
// static assets from the cache
self.addEventListener('fetch', (e) => {
	e.respondWith(caches.match(e.request).then((response) => (response ? response : fetch(e.request))));
});
		`;
		fs.writeFileSync('.build/public/service-worker.js', content);
	}
}
