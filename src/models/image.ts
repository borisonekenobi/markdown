import type {InlineWithNoInline} from './inline-element.js';

export class Image implements InlineWithNoInline {
	public src: string;
	public alt?: string | undefined;
	public title?: string | undefined;

	public constructor(src: string, alt?: string, title?: string) {
		this.src = src;
		this.alt = alt;
		this.title = title;
	}

	public serialize(): string {
		return `![${this.alt}](${this.src} \"${this.title}\")`;
	}
}
