import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import DocsService from '../services/DocsService';
import ServiceWorkerService from '../services/ServiceWorkerService';

export const name = HOOKS.LUNA_INITIALIZE;

export default async ({ luna }) => {
	const docsService = new DocsService();

	const docs = docsService.constructor.loadAllDocsPagesFlat();

	const serviceWorkerService = new ServiceWorkerService(docs);
	serviceWorkerService.writeServiceWorkerFile();

	luna.set('docs-service', docsService);
};
