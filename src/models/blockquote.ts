import type {BlockElement, BlockWithManyBlocks} from './block-element.js';

export class Blockquote implements BlockWithManyBlocks {
	public blocks: BlockElement[];

	public constructor(blocks: BlockElement[]) {
		this.blocks = blocks;
	}

	public serialize(): string {
		return `> ${this.blocks.map(block => block.serialize().
			replaceAll('\n', '\n> ')).
			join('\n> ')}`;
	}
}
