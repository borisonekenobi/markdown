import type {State as HastToMdastState} from 'hast-util-to-mdast';
import type {Element, ElementContent} from 'hast';

export function getFootnoteReference(node: Element): any | undefined {
	if (node.children.length !== 1) {
		return undefined;
	}

	const child = node.children[0] as Element | undefined;
	if (!child || child.type !== 'element' || child.tagName !== 'a') {
		return undefined;
	}

	const href = String((child.properties as any)?.href ?? '');
	if (!/^#user-content-fn-/.test(href)) {
		return undefined;
	}

	return {
		type: 'footnoteReference',
		identifier: href.replace(/^#user-content-fn-/, ''),
	};
}

export function isFootnotesSection(node: Element): boolean {
	const props = node.properties as any;
	return node.tagName === 'section' && (props?.dataFootnotes !== undefined ||
		Array.isArray(props?.className) &&
		props.className.includes('footnotes'));
}

export function footnotesFromSection(
	state: HastToMdastState, node: Element): Array<any> {
	const ol = node.children.find(
		child => child.type === 'element' && child.tagName === 'ol');
	if (!ol || ol.type !== 'element') return [];

	return ol.children.flatMap(child => {
		if (child.type !== 'element' || child.tagName !== 'li') return [];

		const identifier = String((child.properties as any)?.id ?? '').
			replace(/^user-content-fn-/, '');
		const children = child.children.filter(grandchild => {
			if (grandchild.type !== 'element') return false;
			const el = grandchild as Element;
			const props = el.properties as any;
			// skip standalone backref anchors
			return !(el.tagName === 'a' &&
				(props?.dataFootnoteBackref !== undefined ||
					/^#user-content-fnref-/.test(
						String(props?.href ?? ''))));

		}).map(grandchild => state.one(filterFootnoteBackref(
			grandchild as Element), child)).filter(Boolean);

		return [
			{
				type: 'footnoteDefinition',
				identifier,
				children,
			}];
	});
}

export function filterFootnoteBackref(node: Element): Element {
	const newChildren: ElementContent[] = [];

	for (const child of node.children as ElementContent[]) {
		if (child.type !== 'element') {
			newChildren.push(child);
			continue;
		}

		const el = child as Element;
		if (el.tagName === 'a') {
			const props = el.properties as any;
			if (props?.dataFootnoteBackref !== undefined ||
				/^#user-content-fnref-/.test(String(props?.href ?? ''))) {
				// skip backreference anchor
				continue;
			}
		}

		// child is an Element and not a backref anchor, recurse
		newChildren.push(filterFootnoteBackref(el));
	}

	return {
		...node,
		children: newChildren,
	} as Element;
}
