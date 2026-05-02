import type {BlockWithNoInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export class Table implements BlockWithNoInline {
	public rows: TableRow[];

	public constructor(rows: TableRow[]) {
		this.rows = rows;
	}

	public serialize(): string {
		return `[${this.rows.join(' | ')}]`;
	}
}

export class TableRow {
	public cells: TableCell[];

	public constructor(cells: TableCell[]) {
		this.cells = cells;
	}
}

export class TableCell {
	public inlines: InlineElement[];

	public constructor(inlines: InlineElement[]) {
		this.inlines = inlines;
	}
}
