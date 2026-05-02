import type {BlockWithManyInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export class Heading implements BlockWithManyInline {
	public inlines: InlineElement[];
	public level: 1 | 2 | 3 | 4 | 5 | 6;

	public constructor(inlines: InlineElement[], level: 1 | 2 | 3 | 4 | 5 | 6) {
		this.inlines = inlines;
		this.level = level;
	}

	public serialize(): string {
		return `${'#'.repeat(this.level)} ${this.inlines.map(
			inline => inline.serialize()).join('')}`;
	}
}
