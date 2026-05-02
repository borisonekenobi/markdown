import type {BlockWithManyInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export class Paragraph implements BlockWithManyInline {
	public inlines: InlineElement[];

	public constructor(inlines: InlineElement[]) {
		this.inlines = inlines;
	}

	public serialize(): string {
		return this.inlines.map(inline => inline.serialize()).join('');
	}
}
