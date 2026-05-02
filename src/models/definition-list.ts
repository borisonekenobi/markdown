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
	public inlines: InlineElement[];
	public definitions: BlockElement[];

	public constructor(inlines: InlineElement[], definitions: BlockElement[]) {
		this.inlines = inlines;
		this.definitions = definitions;
	}

	public serialize(): string {
		return `${this.inlines.map(inline => inline.serialize()).
			join('')}\n:${this.definitions.map(
			definition => definition.serialize()).join('\n:')}`;
	}
}
