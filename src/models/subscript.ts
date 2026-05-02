import type {InlineElement, InlineWithManyInline} from './inline-element.js';

export class Subscript implements InlineWithManyInline {
	public inlines: InlineElement[];

	public constructor(inlines: InlineElement[]) {
		this.inlines = inlines;
	}

	public serialize(): string {
		return `~${this.inlines.map(inline => inline.serialize()).join('')}~`;
	}
}
