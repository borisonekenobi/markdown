import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkStringify from 'remark-stringify';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';

// Parse markdown -> HTML string
export async function tmpParse(markdown: string): Promise<string> {
	const vfile = await unified().
		use(remarkParse).
		use(remarkGfm).
		use(remarkHtml).
		process(markdown);

	return String(vfile);
}

// Serialize HTML string -> markdown
export async function tmpSerialize(html: string): Promise<string> {
	const vfile = await unified()
		// parse the HTML input into a rehype tree
		.use(rehypeParse, {fragment: true})
		// convert rehype (HTML) to remark (Markdown) AST
		.use(rehypeRemark)
		// support GitHub-flavored Markdown when stringifying
		.use(remarkGfm).use(remarkStringify).process(html);

	return String(vfile);
}
