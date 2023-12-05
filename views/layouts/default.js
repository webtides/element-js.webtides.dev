import DocsService from '../../services/DocsService';
import faIcon from '../partials/fa-icon';
import fs from 'node:fs';

const trackingEnabled = process.env.ENABLE_TRACKING === 'true';
const robotsIndexingEnabled = process.env.ENABLE_ROBOTS_INDEXING === 'true';

const layout = (page, context = {}) => {
	const docsPages = DocsService.loadAllDocsPages() || [];
	const currentUrl = context.request?.originalUrl || '/';

	let inlineStyles = '';
	try {
		inlineStyles = fs.readFileSync('.build/public/assets/css/inline.css', { encoding: 'utf-8' });
	} catch (error) {
		console.log('cannot load inline styles', error);
	}

	// const html = () => {};

	return `
		<!doctype html>
		<html lang="">
			<head>
				<title>${context.title ?? ''}</title>

				<meta charset="UTF-8" />

				<style>${inlineStyles}</style>
                <link rel="preload" as="style" href="/assets/css/fonts.css" media="all" onload="this.rel='stylesheet'" />
                <link rel="preload" as="style" href="/assets/css/prism.css" media="all" onload="this.rel='stylesheet'" />
                <link rel="preload" as="style" href="/assets/css/base.css" media="all" onload="this.rel='stylesheet'" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
                <link rel="manifest" href="/assets/favicons/site.webmanifest">
                <meta name="theme-color" content="#3f99e1">

                <meta name="robots" content="${robotsIndexingEnabled ? 'all' : 'noindex'}">

				<script>
                    if('serviceWorker' in globalThis.navigator) {
                        let registration;

                        const registerServiceWorker = async () => {
                            registration = await globalThis.navigator.serviceWorker.register('/service-worker.js');
                        };

                        registerServiceWorker();
                    }
                </script>

				${context.head ?? ''}
				<script>
					const reflectColorSchemePreference = () => {
						if (localStorage.getItem('colorSchemePreference') === 'dark' || (!('colorSchemePreference' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
						  document.documentElement.classList.add('dark');
                          document.documentElement.style.colorScheme = 'dark';
						} else {
						  document.documentElement.classList.remove('dark');
                          document.documentElement.style.colorScheme = 'light';
						}
					};

					reflectColorSchemePreference();

					window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
						reflectColorSchemePreference();
					});
				</script>
				<!-- TODO: dark mode is somehow cut off at some point?! -->
			</head>
			<body class="antialiased font-sans flex min-h-full bg-white dark:bg-slate-900">
				<div class="flex w-full flex-col">
					<header
						close-nav
						class="sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8 dark:bg-transparent"
					>
						<div class="mr-6 flex lg:hidden">
							<docs-nav-toggle>
								<button slot="open" type="button" class="relative" aria-label="Open navigation">
									${faIcon.solid('bars', 'h-5 w-5 text-slate-500')}
								</button>
								<button slot="close" type="button" class="relative" aria-label="Close navigation">
									${faIcon.solid('xmark', 'h-5 w-5 text-slate-500')}
								</button>
							</docs-nav-toggle>
							<div
								style="position:fixed;top:1px;left:1px;width:1px;height:0;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0;display:none"
							></div>
						</div>
						<div class="relative flex flex-grow basis-0 items-center">
							<ejs-logo></ejs-logo>
						</div>
						<div class="-my-5 mr-6 sm:mr-8 md:mr-0">
							<docs-search class='hidden lg:block'></docs-search>
							<div
								style="position:fixed;top:1px;left:1px;width:1px;height:0;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0;display:none"
							></div>
						</div>
						<div class="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
							<ejs-theme-selector></ejs-theme-selector>
							<a
								class="group"
								aria-label="GitHub"
								target="_blank"
								href="https://github.com/webtides/element-js/"
							>
								${faIcon.brands('github', 'h-6 w-6 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300')}
							</a>
						</div>
					</header>
					${context.showHero ? '<docs-hero></docs-hero>' : ''}
					<div
						class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12"
					>
						<div class="search-backdrop fixed inset-0 z-30 items-start overflow-y-auto bg-slate-900/50 backdrop-blur transition-opacity opacity-0 search-open:opacity-100 pointer-events-none"></div>
						<div close-nav class="nav-backdrop fixed inset-0 z-10 items-start overflow-y-auto bg-slate-900/50 backdrop-blur transition-opacity opacity-0 nav-open:opacity-100 lg:hidden"></div>
						<div class="fixed left-0 top-0 bottom-0 z-20 transition-transform translate-x-[-100%] nav-open:translate-x-0 lg:translate-x-0 lg:relative lg:flex-none pl-6 lg:pl-0 nav-open:bg-white nav-open:dark:bg-slate-900">
							<div class="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 hidden lg:block dark:hidden"></div>
							<div
								class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"
							></div>
							<div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
							<div
								class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16"
							>
								<!-- TODO: make .property working in SSR?! -->
								<docs-link-list current-url='${currentUrl}' docs='${JSON.stringify(docsPages)}'></docs-link-list>
							</div>
						</div>
						<main class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
							${page ?? ''}
						</main>
						<div
							class="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6 w-1/5 max-w-[20%]"
						>
							<docs-legend></docs-legend>
						</div>
					</div>
				</div>
				<script src="/assets/vendors/prismjs/js/prism.js"></script>

				${trackingEnabled ? `<script src="https://cdn.usefathom.com/script.js" data-site="DBVJXRWS" defer></script>` : ''}
			</body>
		</html>
	`;
};

export default layout;
