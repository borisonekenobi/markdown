import type {InlineWithNoInline} from './inline-element.js';

export class Emoji implements InlineWithNoInline {
	public name: string;

	public constructor(name: string) {
		this.name = name;
	}

	public serialize(): string {
		return `:${this.name}:`;
	}
}
