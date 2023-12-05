import { html } from '@webtides/element-js';

function icon(name, classes) {
	return html`<el-icon base-path="assets/fa-icons" name="${name}" class="${classes}"></el-icon>`;
}

export default {
	solid: (name, classes) => icon(`solid/${name}`, classes),
	regular: (name, classes) => icon(`regular/${name}`, classes),
	brands: (name, classes) => icon(`brands/${name}`, classes),
	duotone: (name, classes) => icon(`duotone/${name}`, classes),
};
