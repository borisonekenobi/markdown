import type {Document} from './models/document.js';

export function serializeMarkdown(document: Document): string {
	return document.serialize();
}

