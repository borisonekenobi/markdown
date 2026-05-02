import type {FileElement} from './file-element.js';
import type {BlockElement, BlockWithNoInline} from './block-element.js';

export class List implements BlockWithNoInline {
	public ordered: boolean;
	public items: ListItem[];
	public start?: number | undefined;

	public constructor(ordered: boolean, items: ListItem[], start?: number) {
		this.ordered = ordered;
		this.items = items;
		this.start = start;
	}

	public serialize(): string {
		// TODO: serializing lists and list elements still needs work
		const startNum = this.start ?? 1;
		const starter = this.ordered ? `${startNum}.` : '-';
		return `${starter}${this.items.map(item => item.serialize()).
			join(`\n${starter}`)}`;
	}
}

export class ListItem implements FileElement {
	public blocks: BlockElement[];
	public checked?: boolean | undefined;

	public constructor(blocks: BlockElement[], checked?: boolean) {
		this.blocks = blocks;
		this.checked = checked;
	}

	public serialize(): string {
		const hasCheckbox = this.checked !== undefined;
		const isChecked = hasCheckbox && this.checked === true;
		return `${hasCheckbox ?
			(isChecked ? ' [x]' : ' [ ]') :
			''} ${this.blocks.map(block => block.serialize()).join('')}`;
	}
}
