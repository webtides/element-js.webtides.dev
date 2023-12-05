import { html, TemplateElement } from '@webtides/element-js';
import { when } from '@webtides/element-js/src/dom-parts/directives';
import { Component } from '@webtides/luna-js';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class DocsNavToggle extends TemplateElement {
	constructor() {
		super({ shadowRender: true });
	}

	properties() {
		return {
			isOpen: false,
		};
	}

	watch() {
		return {
			isOpen: (isOpen) => {
				if (isOpen) {
					document.body.classList.add('nav-open');
				} else {
					document.body.classList.remove('nav-open');
				}
			},
		};
	}

	events() {
		return {
			this: {
				click: () => {
					this.isOpen = !this.isOpen;
				},
			},
			document: {
				click: (event) => {
					if (this.isOpen && event.target.hasAttribute('close-nav')) {
						this.isOpen = false;
					}
				},
			},
		};
	}

	template() {
		return html`
			${when(!this.isOpen, html` <slot name="open" toggle-nav="open"></slot> `)}
			${when(this.isOpen, html` <slot name="close" toggle-nav="close"></slot> `)}
		`;
	}
}
