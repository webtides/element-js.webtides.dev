import fs from 'fs';
import { DocsPage } from '../models/DocsPage.js';

export default class DocsService {
	/**
	 * @return {DocsPage[]}
	 */
	static loadAllDocsPages() {
		try {
			return fs.readdirSync(`.build/public/content/docs`).map((name) => {
				if (name.includes('.md')) {
					// file
					return new DocsPage(name);
				} else {
					// directory
					const docs = fs.readdirSync(`.build/public/content/docs/${name}`).map((doc) => {
						return new DocsPage(doc, name);
					});
					return new DocsPage(name, undefined, docs);
				}
			});
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	/**
	 * @return {DocsPage[]}
	 */
	static loadAllDocsPagesFlat() {
		const docsPages = DocsService.loadAllDocsPages() || [];

		const flatList = [];
		for (let docsPage of docsPages) {
			flatList.push(docsPage);
			for (let nestedDoc of docsPage.docs || []) {
				flatList.push(nestedDoc);
			}
		}
		return flatList;
	}

	static loadDocsPage(name) {
		try {
			if (name.startsWith('/')) {
				name = name.substring(1);
			}

			if (name.endsWith('/')) {
				name = name.substring(0, name.length - 1);
			}

			const docsPages = DocsService.loadAllDocsPages() || [];

			let docsPage;
			for (let doc of docsPages) {
				// special case for top README
				if (name === 'README' && doc.name === 'README') {
					return doc;
				}
				for (let nestedDoc of doc.docs || []) {
					if (nestedDoc.name === name) {
						docsPage = nestedDoc;
					}
				}
			}

			return docsPage;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static getLinksForDocs() {
		const docsPages = DocsService.loadAllDocsPages() || [];

		const docsLinks = {};
		for (let docsPage of docsPages) {
			for (let nestedDoc of docsPage.docs || []) {
				docsLinks[`${docsPage.name}/${nestedDoc.name}`] = nestedDoc;
			}
		}
		return docsLinks;
	}
}
