import type {FileElement} from './file-element.js';
import type {BlockElement} from './block-element.js';

export class Document implements FileElement {
	blocks: BlockElement[];

	public constructor(blocks: BlockElement[]) {
		this.blocks = blocks;
	}

	public serialize(): string {
		return `${this.blocks.map(block => block.serialize()).join('\n\n')}\n`;
	}
}
