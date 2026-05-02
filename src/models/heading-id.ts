import type {InlineWithNoInline} from './inline-element.js';

export class HeadingId implements InlineWithNoInline {
	public id: string;

	public constructor(id: string) {
		this.id = id;
	}

	public serialize(): string {
		return `{#${this.id}}`;
	}
}
