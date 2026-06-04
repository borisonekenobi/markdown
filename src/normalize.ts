import type {VFile} from 'vfile';
import {parse} from './parse.js';
import {serialize} from './serialize.js';

/**
 * Normalizes HTML by parsing it to Markdown and back to HTML.
 * @param html The HTML to normalize.
 * @returns A VFile containing the resulting normalized HTML.
 */
export async function normalize(html: string): Promise<VFile> {
	const markdown: VFile = await serialize(html);
	return parse(markdown.toString());
}
