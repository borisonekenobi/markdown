import type {InlineWithNoInline} from './inline-element.js';

export class InlineCode implements InlineWithNoInline {
	public code: string;

	public constructor(code: string) {
		this.code = code;
	}

	public serialize(): string {
		return `\`${this.code}\``;
	}
}
