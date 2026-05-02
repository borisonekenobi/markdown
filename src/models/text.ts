import type {InlineWithNoInline} from './inline-element.js';

export class Text implements InlineWithNoInline {
	public value: string;

	public constructor(value: string) {
		this.value = value;
	}

	public serialize(): string {
		return this.value;
	}
}
