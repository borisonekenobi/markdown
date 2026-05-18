import type {State as ToMarkdownState} from 'mdast-util-to-markdown';

export const stringifyHandlers = {
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
} as const;
