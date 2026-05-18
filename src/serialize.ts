import {unified} from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRaw from 'rehype-raw';
import rehypeRemark from 'rehype-remark';
import {defListHastToMdast, remarkDefinitionList} from 'remark-definition-list';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import {remarkMark} from 'remark-mark-highlight';
import remarkSupersub from 'remark-supersub';
import remarkHeadingId from 'remark-heading-id';
import remarkStringify from 'remark-stringify';
import type {Options, State as HastToMdastState} from 'hast-util-to-mdast';
import type {Element} from 'hast';
import type {State as ToMarkdownState} from 'mdast-util-to-markdown';

/**
 * Serialize HTML string -> markdown
 * @param html
 */
export async function tmpSerialize(html: string): Promise<string> {
	const vfile = await unified().
		use(rehypeParse, {fragment: true}).
		use(rehypeRaw).
		use(rehypeRemark, {handlers}).
		use(remarkDefinitionList).
		use(remarkGfm, {singleTilde: false}).
		use(remarkGemoji).
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

	return String(vfile);
}

const handlers: NonNullable<Options['handlers']> = {
	...defListHastToMdast,
	mark: (state: HastToMdastState, node: Element) => {
		return {
			type: 'mark', children: state.all(node),
		} as any;
	},
	sub: (state: HastToMdastState, node: Element) => {
		return {
			type: 'sub', children: state.all(node),
		} as any;
	},
	sup: (state: HastToMdastState, node: Element) => {
		const footnoteRef = getFootnoteReference(node);
		if (footnoteRef) {
			return footnoteRef;
		}

		return {
			type: 'sup', children: state.all(node),
		} as any;
	}, ...createHeadingHandlers(),
	section: (state: HastToMdastState, node: Element) => {
		if (!isFootnotesSection(node)) {
			return state.all(node);
		}

		return footnotesFromSection(state, node);
	},
};

const stringifyHandlers = {
	defListDescription: (
		node: any, _parent: any, state: ToMarkdownState, info: any) => {
		return node.children.map((child: any) => {
			if (child.type === 'paragraph') {
				return `: ${state.containerPhrasing(child, info)}`;
			}

			return `: ${state.handle(child, node, state, info)}`;
		}).join('\n');
	},
	heading: (node: any, _parent: any, state: ToMarkdownState, info: any) => {
		const id = node.data?.id ? ` {#${node.data.id}}` : '';
		return `${'#'.repeat(node.depth)} ${state.containerPhrasing(node,
			info)}${id}`;
	},
	sub: (node: any, _parent: any, state: ToMarkdownState, info: any) => {
		return `~${state.containerPhrasing(node, info)}~`;
	},
	sup: (node: any, _parent: any, state: ToMarkdownState, info: any) => {
		return `^${state.containerPhrasing(node, info)}^`;
	},
};

function toHeading(
	state: HastToMdastState, node: Element, depth: 1 | 2 | 3 | 4 | 5 | 6): any {
	return {
		type: 'heading',
		depth,
		data: node.properties && 'id' in node.properties ?
			{id: String((node.properties as any).id)} :
			undefined,
		children: state.all(node),
	} as any;
}

function getFootnoteReference(node: Element): any | undefined {
	if (node.children.length !== 1) return undefined;

	const child = node.children[0] as Element | undefined;
	if (!child || child.type !== 'element' || child.tagName !==
		'a') return undefined;

	const href = String((child.properties as any)?.href ?? '');
	if (!/^#user-content-fn-/.test(href)) return undefined;

	return {
		type: 'footnoteReference',
		identifier: href.replace(/^#user-content-fn-/, ''),
	};
}

function createHeadingHandlers(): Record<string, (
	state: HastToMdastState, node: Element) => any> {
	const result: Record<string, (
		state: HastToMdastState, node: Element) => any> = {};

	for (const depth of [1, 2, 3, 4, 5, 6] as const) {
		result[`h${depth}`] = (
			state: HastToMdastState, node: Element) => toHeading(state, node,
			depth);
	}

	return result;
}

function isFootnotesSection(node: Element): boolean {
	const props = node.properties as any;
	return node.tagName === 'section' && (props?.dataFootnotes !== undefined ||
		Array.isArray(props?.className) &&
		props.className.includes('footnotes'));
}

function footnotesFromSection(
	state: HastToMdastState, node: Element): Array<any> {
	const ol = node.children.find(
		child => child.type === 'element' && child.tagName === 'ol');
	if (!ol || ol.type !== 'element') return [];

	return ol.children.flatMap(child => {
		if (child.type !== 'element' || child.tagName !== 'li') return [];

		const identifier = String((child.properties as any)?.id ?? '').
			replace(/^user-content-fn-/, '');
		const paragraphs = child.children.filter(
			grandchild => grandchild.type === 'element' &&
				grandchild.tagName === 'p') as Array<Element>;

		return [
			{
				type: 'footnoteDefinition',
				identifier,
				children: paragraphs.map(paragraph => ({
					type: 'paragraph',
					children: state.all(filterFootnoteBackref(paragraph)),
				})),
			}];
	});
}

function filterFootnoteBackref(paragraph: Element): Element {
	return {
		...paragraph, children: paragraph.children.filter(child => {
			if (child.type !== 'element' || child.tagName !== 'a') return true;
			const props = child.properties as any;
			return !(props?.dataFootnoteBackref !== undefined ||
				/^#user-content-fnref-/.test(String(props?.href ?? '')));
		}),
	};
}
