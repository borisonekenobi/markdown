import type {Document} from './models/document.js';

export function serialize(document: Document): string {
	return document.serialize();
}

