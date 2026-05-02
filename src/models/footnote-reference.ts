import type {InlineWithNoInline} from './inline-element.js';

export class FootnoteReference implements InlineWithNoInline {
	public id: string;
	public label?: string | undefined;

	public constructor(id: string, label?: string) {
		this.id = id;
		this.label = label;
	}

	public serialize(): string {
		return `[^${this.id}]`;
	}
}
