import type {State as HastToMdastState} from 'hast-util-to-mdast';
import type {Element} from 'hast';

export function toHeading(
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

export function createHeadingHandlers(): Record<string, (
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
