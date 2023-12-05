import { html, TemplateElement } from '@webtides/element-js';
import { when } from '@webtides/element-js/src/dom-parts/directives';
import { Component } from '@webtides/luna-js';
import faIcon from '../partials/fa-icon';

@Component({
	target: Component.TARGET_SERVER,
})
export default class DocsPagination extends TemplateElement {
	properties() {
		return {
			currentPage: '',
			links: {},
		};
	}

	getPreviousLink() {
		const linkKeys = Object.keys(this.links);
		const currentIndex = linkKeys.indexOf(this.currentPage);
		return this.links[linkKeys[currentIndex + -1]];
	}

	getNextLink() {
		const linkKeys = Object.keys(this.links);
		const currentIndex = linkKeys.indexOf(this.currentPage);
		return this.links[linkKeys[currentIndex + 1]];
	}

	template() {
		const previousLinkPage = this.getPreviousLink();
		const nextLinkPage = this.getNextLink();
		return html`
			<dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
				${when(
					previousLinkPage,
					html`
						<div>
							<dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Previous</dt>
							<dd class="mt-1">
								<a
									class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 flex-row-reverse"
									href="${previousLinkPage?.link}"
								>
									${previousLinkPage?.title}
									${faIcon.regular('arrow-left', 'h-4 w-4 flex-none fill-current')}
								</a>
							</dd>
						</div>
					`,
				)}
				${when(
					nextLinkPage,
					html`
						<div class="ml-auto text-right">
							<dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Next</dt>
							<dd class="mt-1">
								<a
									class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
									href="${nextLinkPage?.link}"
								>
									${nextLinkPage?.title}
									${faIcon.regular('arrow-right', 'h-4 w-4 flex-none fill-current')}
								</a>
							</dd>
						</div>
					`,
				)}
			</dl>
		`;
	}
}
