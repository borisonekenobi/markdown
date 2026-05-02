import type {BlockWithNoInline} from './block-element.js';

export class HorizontalRule implements BlockWithNoInline {
	public serialize(): string {
		return '---';
	}
}
