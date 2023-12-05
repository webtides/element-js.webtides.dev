import fs from 'fs';
import frontmatter from '@github-docs/frontmatter';
import { marked } from 'marked';

export class DocsPage {
	name;
	parentName;
	title;
	path;
	link;
	docs;

	data;
	content;
	html;

	constructor(name, parentName = undefined, docs = []) {
		this.name = name.replace('.md', '');
		this.parentName = parentName;
		this.title = name
			.replace('.md', '')
			.split('-')
			.map((string) => string[0].toUpperCase() + string.substring(1))
			.join(' ');
		this.path = parentName
			? `.build/public/content/docs/${parentName}/${name}`
			: `.build/public/content/docs/${name}`;
		this.link = `/docs/${this.name}`;
		this.docs = docs;

		// if (name.includes('.md')) {
		// 	const markdown = fs.readFileSync(this.path, 'utf-8');
		// 	// const { data, content, errors } = frontmatter(markdown);
		// 	// this.data = data;
		// 	// this.content = content;
		// 	// this.html = marked(content);
		// }
	}

	getMarkdown() {
		if (!this.path.includes('.md')) {
			return null;
		}
		const markdown = fs.readFileSync(this.path, 'utf-8');
		const { data, content, errors } = frontmatter(markdown);
		return content;
	}
}
