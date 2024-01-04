import { TemplateElement, html } from '@webtides/element-js';
import { unsafeHTML } from '@webtides/element-js/src/dom-parts/directives';
import { Component } from '@webtides/luna-js';

import style from './el-icon.css';

@Component({
	target: Component.TARGET_CLIENT,
})
export default class ElIcon extends TemplateElement {
	constructor() {
		super({ styles: [style], deferUpdate: true, autoUpdate: false });
	}

	properties() {
		return {
			baseUrl: '',
			basePath: 'assets/icons',
			name: '',
			lazy: true,
			svgContent: '',
		};
	}

	connected() {
		// TODO: use intersection observer for lazy loading
		this.fetchIcon();
	}

	fetchIcon() {
		// TODO: think about cache busting the url
		// maybe add timestamp? or commit hash from window['commitHash'] or something ?
		fetch(`${this.baseUrl}/${this.basePath}/${this.name}.svg`)
			.then((r) => r.text())
			.then((text) => {
				this.svgContent = text;
				// this.requestUpdate();
			})
			.catch((error) => console.log({ error }));
	}

	template() {
		return this.svgContent ? html`${unsafeHTML(this.svgContent)}` : html``;
	}
}
