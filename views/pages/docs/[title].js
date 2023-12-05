import { TemplateElement, html } from '@webtides/element-js';
import { unsafeHTML } from '@webtides/element-js/src/dom-parts/directives';
import DocsService from '../../../services/DocsService.js';
import fs from 'fs';
import frontmatter from '@github-docs/frontmatter';
import { marked } from 'marked';

// Override function
const renderer = {
	link(href, title, text) {
		// ../features/styles.md
		if (href.startsWith('..') || href.startsWith('./')) {
			const page = href.split('/').pop().replace('.md', '');
			href = '/docs/' + page;
		}

		return `
			<a href="${href}" title="${title || ''}">${text}</a>
		`;
	},
};

marked.use({ renderer });

export default class extends TemplateElement {
	properties() {
		return {
			title: 'Docs',
		};
	}

	async loadDynamicProperties({ request, response }) {
		const docsPage = DocsService.loadDocsPage(request.params.title);
		const docsLinks = DocsService.getLinksForDocs();

		if (!docsPage) {
			return response.status(404);
		}

		const markdown = fs.readFileSync(docsPage.path, 'utf-8');
		const { data, content, errors } = frontmatter(markdown);
		// this.data = data;
		// this.content = content;
		const markdownHTML = marked(content);

		const title = `${docsPage?.title} - Docs`;

		return { request, response, docsPage, docsLinks, markdownHTML, title };
	}

	template() {
		// TODO: unsafeHTML is not working correctly in SSR...
		return html`
			<article>
				<header class="mb-9 space-y-1">
					<p class="font-display text-sm font-medium text-sky-500 capitalize">${this.docsPage?.parentName}</p>
					<h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
						${this.docsPage?.title}
					</h1>
				</header>
				<div
					class="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800"
				>
					${unsafeHTML(this.markdownHTML || '')}
				</div>
			</article>
			<docs-pagination
				current-page="${this.docsPage?.parentName}/${this.docsPage?.name}"
				links="${JSON.stringify(this.docsLinks || [])}"
			></docs-pagination>
		`;
	}
}
