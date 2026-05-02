import type {InlineElement, InlineWithManyInline} from './inline-element.js';

export class Link implements InlineWithManyInline {
	public inlines: InlineElement[];
	public href: string;

	public constructor(inlines: InlineElement[], href: string) {
		this.inlines = inlines;
		this.href = href;
	}

	public serialize(): string {
		return `[${this.inlines.map(inline => inline.serialize()).
			join('')}](${this.href})`;
	}
}
