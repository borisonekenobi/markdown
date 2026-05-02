import type {BlockElement, BlockWithNoInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export class DefinitionList implements BlockWithNoInline {
	public items: DefinitionItem[];

	public constructor(items: DefinitionItem[]) {
		this.items = items;
	}

	public serialize(): string {
		// TODO
		return JSON.stringify(this.items);
	}
}

export class DefinitionItem {
	public term: InlineElement[];
	public definitions: BlockElement[];

	public constructor(term: InlineElement[], definitions: BlockElement[]) {
		this.term = term;
		this.definitions = definitions;
	}
}
