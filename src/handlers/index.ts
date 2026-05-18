import {defListHastToMdast} from 'remark-definition-list';
import type {Options, State as HastToMdastState} from 'hast-util-to-mdast';
import type {Element} from 'hast';
import {createHeadingHandlers} from './heading-handlers.js';
import {
    filterFootnoteBackref,
    footnotesFromSection,
    getFootnoteReference,
    isFootnotesSection,
} from './footnotes.js';
import {stringifyHandlers as _stringifyHandlers} from './stringify-handlers.js';

export const stringifyHandlers = _stringifyHandlers;

export const handlers: NonNullable<Options['handlers']> = {
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
	},
	...createHeadingHandlers(),
	section: (state: HastToMdastState, node: Element) => {
		if (!isFootnotesSection(node)) {
			return state.all(node);
		}

		return footnotesFromSection(state, node);
	},
};

export {filterFootnoteBackref};
