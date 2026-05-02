import type {InlineWithNoInline} from './inline-element.js';

export type ImageReferenceType = 'shortcut' | 'collapsed' | 'full';

export class ImageReference implements InlineWithNoInline {
	public id: string;
	public alt?: string | undefined;
	public label?: string | undefined;
	public referenceType: ImageReferenceType;

	public constructor(
		id: string, referenceType: ImageReferenceType,
		alt?: string, label?: string) {
		this.id = id;
		this.referenceType = referenceType;
		this.alt = alt;
		this.label = label;
	}

	public serialize(): string {
		switch (this.referenceType) {
			case 'shortcut':
				return `![${this.alt}][${this.label ?? this.id}]`;
			case 'collapsed':
				return `![${this.alt}][]`;
			case 'full':
				return `![${this.alt}][${this.label}]`;
			default:
				throw new Error(
					`Unsupported reference type '${this.referenceType}'`);
		}
	}
}
