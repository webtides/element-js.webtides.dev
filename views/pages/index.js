import { html } from '@webtides/element-js';
import faIcon from '../partials/fa-icon';

export default class {
	properties() {
		return {
			title: 'element-js',
		};
	}

	async loadDynamicProperties({ request, response }) {
		return { request, response, showHero: true };
	}

	template() {
		return html`
			<article>
				<header class="mb-9 space-y-1">
					<p class="font-display text-sm font-medium text-sky-500">@webtides</p>
					<h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white">element-js</h1>
				</header>
				<div
					class="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800"
				>
					<p class="lead">
						Learn how to get CacheAdvance set up in your project in under thirty minutes or it's free.
					</p>
					<div class="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
							<div
								class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
							></div>
							<div class="relative overflow-hidden rounded-xl p-6">
								${faIcon.duotone('diamond-half', 'h-8 w-8')}
								<h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
									<a href="/docs/README"><span class="absolute -inset-px rounded-xl"></span>Simple</a>
								</h2>
								<p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
									Element-JS is built on the principle of simplicity, offering a user-friendly
									interface and straightforward syntax. It makes creating web components hassle-free,
									enabling both beginners and experienced developers to craft powerful applications
									with ease.
								</p>
							</div>
						</div>
						<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
							<div
								class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
							></div>
							<div class="relative overflow-hidden rounded-xl p-6">
								${faIcon.duotone('square-bolt', 'h-8 w-8')}
								<h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
									<a href="/"><span class="absolute -inset-px rounded-xl"></span>Fast</a>
								</h2>
								<p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
									Designed for optimal performance, Element-JS ensures fast loading and responsive
									interactions. By focusing on efficient code execution and minimal overhead, it
									delivers a swift experience, enhancing user engagement and satisfaction.
								</p>
							</div>
						</div>
						<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
							<div
								class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
							></div>
							<div class="relative overflow-hidden rounded-xl p-6">
								${faIcon.duotone('crystal-ball', 'h-8 w-8')}
								<h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
									<a href="/"
										><span class="absolute -inset-px rounded-xl"></span>Standards Compliant</a
									>
								</h2>
								<p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
									Element-JS adheres to current web standards, ensuring that your projects are built
									on reliable and future-proof foundations.
								</p>
							</div>
						</div>
						<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
							<div
								class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
							></div>
							<div class="relative overflow-hidden rounded-xl p-6">
								${faIcon.duotone('code', 'h-8 w-8')}
								<h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
									<a href="/"
										><span class="absolute -inset-px rounded-xl"></span>Framework Agnostic</a
									>
								</h2>
								<p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
									Compatible with a variety of frameworks like React, Vue, and Angular, Element-JS
									provides flexibility and integration options for diverse development environments.
								</p>
							</div>
						</div>
						<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
							<div
								class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
							></div>
							<div class="relative overflow-hidden rounded-xl p-6">
								${faIcon.duotone('file-binary', 'h-8 w-8')}
								<h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
									<a href="/"><span class="absolute -inset-px rounded-xl"></span>Dependency-Free</a>
								</h2>
								<p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
									Element-JS operates independently without reliance on external libraries or
									frameworks. This autonomy makes it a lightweight and robust solution, perfect for
									projects where minimizing dependencies is crucial for performance and security.
								</p>
							</div>
						</div>
						<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
							<div
								class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
							></div>
							<div class="relative overflow-hidden rounded-xl p-6">
								${faIcon.duotone('sitemap', 'h-8 w-8')}
								<h2 class="mt-4 font-display text-base text-slate-900 dark:text-white">
									<a href="/"><span class="absolute -inset-px rounded-xl"></span>Shared Store</a>
								</h2>
								<p class="mt-1 text-sm text-slate-700 dark:text-slate-400">
									Element-JS features a shared store for state management across components,
									facilitating efficient data handling and synchronization within your application.
								</p>
							</div>
						</div>
					</div>
					<p>
						Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga
						eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste.
					</p>
				</div>
			</article>
		`;
	}
}
