import { html, TemplateElement } from '@webtides/element-js';
import { Component } from '@webtides/luna-js';
import faIcon from '../../partials/fa-icon';

@Component({
	target: Component.TARGET_BOTH,
})
export default class EjsThemeSelector extends TemplateElement {
	constructor() {
		super({ deferUpdate: true });
	}

	properties() {
		return {
			theme: 'system',
		};
	}

	connected() {
		const theme = localStorage.getItem('colorSchemePreference');
		this.theme = theme || 'system';
		this.requestUpdate();
	}

	watch() {
		return {
			theme: (theme) => {
				if (theme === 'system') {
					localStorage.removeItem('colorSchemePreference');
				} else {
					localStorage.setItem('colorSchemePreference', theme);
				}
				this.reflectColorSchemePreference();
				this.requestUpdate();
			},
		};
	}

	events() {
		return {
			this: {
				click: (event) => {
					const button = event.target.closest('[data-theme]');
					if (button && button.hasAttribute('data-theme')) {
						this.theme = button.getAttribute('data-theme');
					}
				},
			},
		};
	}

	reflectColorSchemePreference() {
		if (
			localStorage.getItem('colorSchemePreference') === 'dark' ||
			(!('colorSchemePreference' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			document.documentElement.style.colorScheme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.style.colorScheme = 'light';
		}
	}

	template() {
		return html`
			<el-dropdown class="relative">
				<button
					slot="trigger"
					class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
					aria-label="Theme"
					type="button"
				>
					${faIcon.solid('sun-bright', 'h-4 w-4 dark:hidden text-slate-400')}
					${faIcon.solid('moon-stars', 'hidden h-4 w-4 dark:block text-slate-400')}
				</button>
				<ul
					slot="content"
					class="absolute left-1/2 top-full mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5"
				>
					<li>
						<button
							class="flex cursor-pointer select-none items-center w-full rounded-[0.625rem] p-1 ${this
								.theme === 'light'
								? 'text-sky-500'
								: 'text-slate-700 dark:text-slate-400'} hover:bg-slate-100 hover:dark:text-white hover:dark:bg-slate-900/40"
							data-theme="light"
						>
							<div
								class="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
							>
								${faIcon.solid(
									'sun-bright',
									this.theme === 'light'
										? 'h-4 w-4 text-sky-400 dark:text-sky-400'
										: 'h-4 w-4 text-slate-400',
								)}
							</div>
							<div class="ml-3">Light</div>
						</button>
					</li>
					<li>
						<button
							class="flex cursor-pointer select-none items-center w-full rounded-[0.625rem] p-1 ${this
								.theme === 'dark'
								? 'text-sky-500'
								: 'text-slate-700 dark:text-slate-400'} hover:bg-slate-100 hover:dark:text-white hover:dark:bg-slate-900/40"
							data-theme="dark"
						>
							<div
								class="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
							>
								${faIcon.solid(
									'moon-stars',
									this.theme === 'dark'
										? 'h-4 w-4 text-sky-400 dark:text-sky-400'
										: 'h-4 w-4 text-slate-400',
								)}
							</div>
							<div class="ml-3">Dark</div>
						</button>
					</li>
					<li>
						<button
							class="flex cursor-pointer select-none items-center w-full rounded-[0.625rem] p-1 ${this
								.theme === 'system'
								? 'text-sky-500'
								: 'text-slate-700 dark:text-slate-400'} hover:bg-slate-100 hover:dark:text-white hover:dark:bg-slate-900/40"
							data-theme="system"
						>
							<div
								class="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
							>
								${faIcon.solid(
									'display',
									this.theme === 'system'
										? 'h-4 w-4 text-sky-400 dark:text-sky-400'
										: 'h-4 w-4 text-slate-400',
								)}
							</div>
							<div class="ml-3">System</div>
						</button>
					</li>
				</ul>
			</el-dropdown>
		`;
	}
}
