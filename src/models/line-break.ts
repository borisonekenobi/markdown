import type {InlineWithNoInline} from './inline-element.js';

export class LineBreak implements InlineWithNoInline {
	public constructor() {
	}

	public serialize(): string {
		return '\n';
	}
}
