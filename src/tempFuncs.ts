import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkStringify from 'remark-stringify';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import {
	defListHastHandlers,
	remarkDefinitionList,
} from 'remark-definition-list';

// Parse markdown -> HTML string
export async function tmpParse(markdown: string): Promise<string> {
	const vfile = await unified().
		use(remarkParse).
		use(remarkDefinitionList).
		use(remarkGfm).
		use(remarkRehype,
			{allowDangerousHtml: true, handlers: defListHastHandlers}).
		use(rehypeRaw).
		use(rehypeStringify).
		process(markdown);

	return String(vfile);
}

// Serialize HTML string -> markdown
export async function tmpSerialize(html: string): Promise<string> {
	const vfile = await unified().
		use(rehypeParse, {fragment: true}).
		use(rehypeRemark).
		use(remarkGfm).use(remarkStringify).process(html);

	return String(vfile);
}
