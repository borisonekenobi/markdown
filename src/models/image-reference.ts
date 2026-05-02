import type {InlineWithNoInline} from './inline-element.js';

export type ImageReferenceType = 'shortcut' | 'collapsed' | 'full';

export class ImageReference implements InlineWithNoInline {
	public identifier: string;
	public alt?: string | undefined;
	public label?: string | undefined;
	public referenceType: ImageReferenceType;

	public constructor(
		identifier: string, referenceType: ImageReferenceType, alt?: string,
		label?: string) {
		this.identifier = identifier;
		this.referenceType = referenceType;
		this.alt = alt;
		this.label = label;
	}

	public serialize(): string {
		const alt = this.alt ? this.alt : '';
		const ref = this.label ? `${this.label}` : this.identifier;
		return `![${alt}][${ref}]`;
	}
}

