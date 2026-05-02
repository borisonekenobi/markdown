import type {FileElement} from './file-element.js';
import type {InlineElement} from './inline-element.js';

export interface BlockElement extends FileElement {
}

export interface BlockWithManyBlocks extends BlockElement {
	blocks: BlockElement[];
}

export interface BlockWithNoInline extends BlockElement {
}

export interface BlockWithOneInline extends BlockElement {
	inline: InlineElement;
}

export interface BlockWithManyInline extends BlockElement {
	inlines: InlineElement[];
}
