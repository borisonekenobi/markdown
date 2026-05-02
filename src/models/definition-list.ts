import type {FileElement} from './file-element.js';
import type {BlockElement, BlockWithNoInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export class DefinitionList implements BlockWithNoInline {
	public items: DefinitionItem[];

	public constructor(items: DefinitionItem[]) {
		this.items = items;
	}

	public serialize(): string {
		return this.items.map(item => item.serialize()).join('\n\n');
	}
}

export class DefinitionItem implements FileElement {
	public term: InlineElement[];
	public definitions: BlockElement[];

	public constructor(term: InlineElement[], definitions: BlockElement[]) {
		this.term = term;
		this.definitions = definitions;
	}

	public serialize(): string {
		return `${this.term.map(
			term => term.serialize())}\n:${this.definitions.join('\n:')}`;
	}
}
