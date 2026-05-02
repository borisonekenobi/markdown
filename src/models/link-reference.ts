import type {InlineElement, InlineWithManyInline} from './inline-element.js';

export class LinkReference implements InlineWithManyInline {
	public inlines: InlineElement[];
	public id: string;

	public constructor(inlines: InlineElement[], id: string) {
		this.inlines = inlines;
		this.id = id;
	}

	public serialize(): string {
		return `[${this.inlines.map(inline => inline.serialize()).
			join('')}][${this.id}];`;
	}
}
