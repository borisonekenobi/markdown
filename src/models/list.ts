import type {BlockElement, BlockWithNoInline} from './block-element.js';

export class List implements BlockWithNoInline {
	public ordered: boolean;
	public items: ListElement[];

	public constructor(ordered: boolean, items: ListElement[]) {
		this.ordered = ordered;
		this.items = items;
	}

	public serialize(): string {
		// TODO
		return `[${this.ordered ? 'ordered' : 'items'}]`;
	}
}

export class ListElement {
	public blocks: BlockElement[];
	public checked?: boolean | undefined;

	public constructor(blocks: BlockElement[], checked?: boolean) {
		this.blocks = blocks;
		this.checked = checked;
	}
}
