import type {InlineElement, InlineWithManyInline} from './inline-element.js';

export class LinkReference implements InlineWithManyInline {
	public inlines: InlineElement[];
	public id: string;
	public label?: string | undefined;

	public constructor(inlines: InlineElement[], id: string, label?: string) {
		this.inlines = inlines;
		this.id = id;
		this.label = label;
	}

	public serialize(): string {
		if (this.label) {
			return `[${this.inlines.map(inline => inline.serialize()).
				join('')}][${this.label}]`;
		} else {
			return `[${this.inlines.map(inline => inline.serialize()).
				join('')}]`;
		}
	}
}
