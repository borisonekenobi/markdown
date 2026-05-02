import type {InlineWithNoInline} from './inline-element.js';

export class Text implements InlineWithNoInline {
	public value: string;

	public constructor(value: string) {
		this.value = value;
	}

	public serialize(): string {
		return escapeMarkdown(this.value);
	}
}

function escapeMarkdown(value: string): string {
	return value.
		replaceAll('\\', '\\\\').
		replaceAll('`', '\\`').
		replaceAll('*', '\\*').
		replaceAll('_', '\\_').
		replaceAll('~', '\\~').
		replaceAll('{', '\\{').
		replaceAll('}', '\\}').
		replaceAll('[', '\\[').
		replaceAll(']', '\\]').
		replaceAll('<', '\\<').
		replaceAll('>', '\\>').
		replaceAll('(', '\\(').
		replaceAll(')', '\\)').
		replaceAll('#', '\\#').
		replaceAll('+', '\\+').
		replaceAll('-', '\\-').
		replaceAll('.', '\\.').
		replaceAll('!', '\\!');
}
