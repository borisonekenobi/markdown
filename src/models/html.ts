import type {InlineWithNoInline} from './inline-element.js';

export class HTML implements InlineWithNoInline {
	public html: string;

	public constructor(html: string) {
		this.html = html;
	}

	public serialize(): string {
		return this.html;
	}
}
