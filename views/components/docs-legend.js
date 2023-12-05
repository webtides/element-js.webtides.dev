import { html, TemplateElement } from '@webtides/element-js';
import { when } from '@webtides/element-js/src/dom-parts/directives';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class DocsLegend extends TemplateElement {
	// TODO: rename to something with "table of contents" ?

	properties() {
		return {
			currentHeadline: undefined,
			headlines: [],
		};
	}

	connected() {
		const headlines = document
			.querySelector('main')
			.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
		if (headlines.length > 0) {
			this.headlines = this.parseHeadlines(headlines);
			this.currentHeadline = this.headlines[0].id;
		}
	}

	// TODO: add scroll listener to highlight current headline in viewport

	events() {
		return {
			window: {
				hashchange: () => {
					this.currentHeadline = location.hash.replace('#', '');
				},
			},
		};
	}

	parseHeadlines(headlines) {
		const firstHeadlineLevel = parseInt(headlines[0].tagName.substring(1));
		const root = { headlines: [] };
		let currentLevel = [root];

		headlines.forEach((headline) => {
			const level = parseInt(headline.tagName.substring(1));
			const newItem = { title: headline.textContent.trim(), id: headline.id, headlines: [] };

			currentLevel[level - firstHeadlineLevel].headlines.push(newItem);
			currentLevel[level - firstHeadlineLevel + 1] = newItem;
		});

		return root.headlines;
	}

	template() {
		return html`
			<nav aria-labelledby="on-this-page-title" class="w-56">
				<h2 id="on-this-page-title" class="font-display text-sm font-medium text-slate-900 dark:text-white">
					On this page
				</h2>
				<ol role="list" class="mt-4 space-y-3 text-sm">
					${this.headlines.map(
						(headline) => html`
							<li>
								<h3>
									<a
										class="${this.currentHeadline === headline.id
											? 'text-sky-500'
											: 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}"
										href="#${headline.id}"
										>${headline.title}</a
									>
								</h3>
								${when(
									headline.headlines.length > 0,
									html`
										<ol role="list" class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
											${headline.headlines.map(
												(nestedHeadline) => html`
													<li>
														<a
															class="${this.currentHeadline === nestedHeadline.id
																? 'text-sky-500'
																: 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}"
															href="#${nestedHeadline.id}"
															>${nestedHeadline.title}</a
														>
													</li>
												`,
											)}
										</ol>
									`,
								)}
							</li>
						`,
					)}
				</ol>
			</nav>
		`;
	}
}
