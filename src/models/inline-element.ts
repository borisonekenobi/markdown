import type {FileElement} from './file-element.js';

export interface InlineElement extends FileElement {
}

export interface InlineWithNoInline extends InlineElement {
}

export interface InlineWithOneInline extends InlineElement {
	inline: InlineElement;
}

export interface InlineWithManyInline extends InlineElement {
	inlines: InlineElement[];
}
