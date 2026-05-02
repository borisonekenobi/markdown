import type {InlineElement, InlineWithManyInline} from './inline-element.js';

export class Link implements InlineWithManyInline {
	public inlines: InlineElement[];
	public href: string;
	public title?: string | undefined;

	public constructor(inlines: InlineElement[], href: string, title?: string) {
		this.inlines = inlines;
		this.href = href;
		this.title = title;
	}

	public serialize(): string {
		return `[${this.inlines.map(inline => inline.serialize()).
			join('')}](${this.href}${this.title ? ` "${this.title}"` : ''})`;
	}
}
