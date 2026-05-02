import type {FileElement} from './file-element.js';
import type {BlockWithNoInline} from './block-element.js';
import type {InlineElement} from './inline-element.js';

export type AlignType = 'center' | 'left' | 'right' | null;

export class Table implements BlockWithNoInline {
	public rows: TableRow[];
	public rowAlignments: AlignType[];

	public constructor(rows: TableRow[], rowAlignments: AlignType[]) {
		this.rows = rows;
		this.rowAlignments = rowAlignments;
	}

	public serialize(): string {
		const separators: string[] = [];
		for (const rowAlignment of this.rowAlignments) {
			switch (rowAlignment) {
				case 'center':
					separators.push(':---:');
					break;
				case 'left':
					separators.push(':---');
					break;
				case 'right':
					separators.push('---:');
					break;
				default:
					separators.push('---');
			}
		}

		const header = this.rows.at(0)!.serialize();
		const separator = `| ${separators.join(' | ')} |`;
		const data = this.rows.slice(1).map(row => row.serialize()).join('\n');
		return `${header}\n${separator}\n${data}`;
	}
}

export class TableRow implements FileElement {
	public cells: TableCell[];

	public constructor(cells: TableCell[]) {
		this.cells = cells;
	}

	public serialize(): string {
		return `| ${this.cells.map(cell => cell.serialize()).join(' | ')} |`;
	}
}

export class TableCell implements FileElement {
	public inlines: InlineElement[];

	public constructor(inlines: InlineElement[]) {
		this.inlines = inlines;
	}

	public serialize(): string {
		return this.inlines.map(inline => inline.serialize()).
			join('').
			replaceAll('|', '\\|');
	}
}
