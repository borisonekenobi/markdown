import type {VFile} from 'vfile';
import {unified} from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRaw from 'rehype-raw';
import rehypeRemark from 'rehype-remark';
import {remarkDefinitionList} from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import {remarkMark} from 'remark-mark-highlight';
import remarkSupersub from 'remark-supersub';
import remarkHeadingId from 'remark-heading-id';
import remarkStringify from 'remark-stringify';
import {handlers, stringifyHandlers} from './handlers/index.js';

/**
 * Parses HTML to a VFile containing Markdown.
 * @param html The HTML to parse.
 * @returns A VFile containing the resulting Markdown.
 */
export function serialize(html: string): Promise<VFile> {
	return unified().
		use(rehypeParse, {fragment: true}).
		use(rehypeRaw).
		use(rehypeRemark, {handlers}).
		use(remarkDefinitionList).
		use(remarkGfm, {singleTilde: false}).
		use(remarkMark).
		use(remarkSupersub).
		use(remarkHeadingId).
		use(remarkStringify, {
			bullet: '*',
			emphasis: '*',
			rule: '-',
			fences: true,
			handlers: stringifyHandlers,
		}).
		process(html);
}
