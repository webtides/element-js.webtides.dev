import { html, TemplateElement } from '@webtides/element-js';
import { Component, Inject } from '@webtides/luna-js';
import FlexSearch from 'flexsearch/dist/module';
import faIcon from '../partials/fa-icon';

@Component({
	target: Component.TARGET_BOTH,
})
export default class DocsSearch extends TemplateElement {
	/** @type DocsService */
	@Inject('docs-service') docsService;

	modifierKey = /(Mac|iPhone|iPod|iPad)/i.test(globalThis.navigator?.platform) ? '⌘' : 'Ctrl';

	properties() {
		return {
			isOpen: false,
			docsData: [],
			searchResults: [],
		};
	}

	async loadDynamicProperties({ request, response }) {
		const docsPages = this.docsService.constructor.loadAllDocsPagesFlat();
		const docsData = docsPages.map((page) => {
			return {
				title: page.title,
				parentName: page.parentName,
				link: page.link,
				content: page.getMarkdown(),
			};
		});

		return { request, response, docsData };
	}

	watch() {
		return {
			isOpen: (isOpen) => {
				if (isOpen) {
					document.body.classList.add('search-open');
				} else {
					document.body.classList.remove('search-open');
				}
			},
		};
	}

	connected() {
		this.searchIndex = new FlexSearch({
			charset: 'latin:advanced',
			tokenize: 'reverse',
			cache: true,
		});

		for (let i = 0; i < this.docsData.length; i++) {
			this.searchIndex.add(i, this.docsData[i].content);
		}
	}

	events() {
		return {
			document: {
				keydown: (event) => {
					if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
						event.preventDefault();
						this.$refs.input.focus();
					}
				},
			},
			'[data-search]': {
				input: (event) => {
					const value = event.target.value;
					this.isOpen = value !== '';
					const results = this.searchIndex.search(value, 25, { suggest: true });
					this.searchResults = results.map((result) => this.docsData[result]);
				},
			},
		};
	}

	template() {
		return html`
			<form
				action=""
				novalidate=""
				role="search"
				class="relative z-30 md:h-auto md:w-80 md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500 lg:w-96 focus-within:outline-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-500"
			>
				<div class="group relative flex items-center h-6">
					${faIcon.solid(
						'magnifying-glass',
						'h-4 w-4 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400',
					)}
					<input
						ref="input"
						data-search
						class="flex-auto appearance-none bg-transparent pl-2 text-slate-900 outline-none placeholder:text-slate-400 focus:flex-none dark:text-white sm:text-sm [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-search-decoration]:hidden [&amp;::-webkit-search-results-button]:hidden [&amp;::-webkit-search-results-decoration]:hidden pr-2"
						aria-autocomplete="both"
						autocomplete="off"
						autocorrect="off"
						autocapitalize="none"
						enterkeyhint="go"
						spellcheck="false"
						placeholder="Search docs"
						maxlength="512"
						type="search"
						value=""
					/>
					<div class="ml-auto hidden font-medium text-slate-400 dark:text-slate-500 md:block">
						<kbd class="font-sans">${this.modifierKey}</kbd><kbd class="font-sans">K</kbd>
					</div>
				</div>
				<div
					class="absolute left-0 right-0 border-t border-slate-200 bg-white px-2 py-3 dark:border-slate-400/10 dark:bg-slate-800 md:ring-1 md:ring-slate-200 rounded-b-lg ${this
						.searchResults.length > 0
						? ''
						: 'hidden'}"
				>
					<ul>
						${this.searchResults.map(
							(result) =>
								html` <li
									class="group block cursor-default rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/30"
								>
									<a href="${result.link}">
										<div
											class="text-sm text-slate-700 group-hover: dark:text-slate-300 dark:group-hover:text-sky-400"
										>
											<span> ${result.title} </span>
										</div>
										<div
											class="mt-0.5 truncate whitespace-nowrap text-xs text-slate-500 dark:text-slate-400"
										>
											<span><span class="">${result.parentName}</span></span
											><span class="sr-only">/</span>
										</div>
									</a>
								</li>`,
						)}
					</ul>
				</div>
			</form>
		`;
	}
}
