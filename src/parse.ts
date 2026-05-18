import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {
	defListHastHandlers,
	remarkDefinitionList,
} from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import {remarkMark} from 'remark-mark-highlight';
import remarkSupersub from 'remark-supersub';
import remarkHeadingId from 'remark-heading-id';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

/**
 * Parse markdown -> HTML string
 * @param markdown
 */
export async function tmpParse(markdown: string): Promise<string> {
	const vfile = await unified().
		use(remarkParse).
		use(remarkDefinitionList).
		use(remarkGfm, {singleTilde: false}).
		use(remarkGemoji).
		use(remarkMark).
		use(remarkSupersub).
		use(remarkHeadingId).
		use(remarkRehype,
			{allowDangerousHtml: true, handlers: defListHastHandlers}).
		use(rehypeRaw).
		use(rehypeHighlight, {detect: false, ignoreMissing: true}).
		use(rehypeStringify).
		process(markdown);

	return String(vfile);
}
