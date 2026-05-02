import type {BlockElement} from './block-element.js';

export class Definition implements BlockElement {
	public identifier: string;
	public url: string;
	public label?: string | undefined;
	public title?: string | undefined;

	public constructor(
		identifier: string, url: string, label?: string, title?: string) {
		this.identifier = identifier;
		this.url = url;
		this.label = label;
		this.title = title;
	}

	public serialize(): string {
		const titlePart = this.title ? ` "${this.title}"` : '';
		return `[${this.label || this.identifier}]: ${this.url}${titlePart}`;
	}
}

