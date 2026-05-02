import type {InlineElement, InlineWithManyInline} from './inline-element.js';

export class Strikethrough implements InlineWithManyInline {
	public inlines: InlineElement[];

	public constructor(inlines: InlineElement[]) {
		this.inlines = inlines;
	}

	// public static parse(node: mdast.Delete): Strikethrough[] {
	// 	const blocks: InlineElement[] = [];
	// 	for (const child of node.children) {
	// 		blocks.push(...parseRootContent(child));
	// 	}
	// 	return [new Strikethrough(blocks)];
	// }

	public serialize(): string {
		return `~~${this.inlines.map(inline => inline.serialize()).join('')}~~`;
	}
}
