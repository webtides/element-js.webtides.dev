import { html, TemplateElement } from '@webtides/element-js';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_SERVER,
})
export default class DocsLinkList extends TemplateElement {
	properties() {
		return {
			currentUrl: '/',
			docs: [],
		};
	}

	template() {
		return html`
			<nav class="text-base lg:text-sm">
				<ul role="list" class="space-y-9">
					${this.docs.map(
						(doc) => html`
							<li>
								<h2 class="font-display font-medium text-slate-900 dark:text-white capitalize">
									${doc.name}
								</h2>
								<ul
									role="list"
									class="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
								>
									${doc.docs?.map(
										(nestedDoc) => html`
											<li class="relative">
												<a
													class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${this
														.currentUrl === nestedDoc.link
														? 'font-semibold text-sky-500 before:bg-sky-500'
														: 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'} capitalize"
													href="/docs/${nestedDoc.name}"
													>${nestedDoc.title}</a
												>
											</li>
										`,
									)}
								</ul>
							</li>
						`,
					)}
				</ul>
			</nav>
		`;
	}
}
