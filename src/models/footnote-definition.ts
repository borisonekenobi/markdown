import type {BlockWithManyInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export class FootnoteDefinition implements BlockWithManyInline {
	public id: string;
	public inlines: InlineElement[];

	public constructor(id: string, inlines: InlineElement[]) {
		this.id = id;
		this.inlines = inlines;
	}

	public serialize(): string {
		return `[^${this.id}]: ${this.inlines.map(inline => inline.serialize()).
			join('')}`;
	}
}
