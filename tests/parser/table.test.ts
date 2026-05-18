import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Tables', () => {
	test('simple', async () => {
		const input = '| Syntax      | Description |\n' +
			'| ----------- | ----------- |\n' +
			'| Header      | Title       |\n' + '| Paragraph   | Text        |';

		expect((await tmpParse(input)).trimStart()).
			toBe(
				'<table><thead><tr><th>Syntax</th><th>Description</th></tr></thead><tbody><tr><td>Header</td><td>Title</td></tr><tr><td>Paragraph</td><td>Text</td></tr></tbody></table>');
	});

	test('varying cell widths', async () => {
		const input = '| Syntax | Description |\n' + '| --- | ----------- |\n' +
			'| Header | Title |\n' + '| Paragraph | Text |';

		expect((await tmpParse(input)).trimStart()).
			toBe(
				'<table><thead><tr><th>Syntax</th><th>Description</th></tr></thead><tbody><tr><td>Header</td><td>Title</td></tr><tr><td>Paragraph</td><td>Text</td></tr></tbody></table>');
	});
});

describe('Alignment', () => {
	test('column alignment', async () => {
		const input = '| Syntax      | Description | Test Text     |\n' +
			'| :---        |    :----:   |          ---: |\n' +
			'| Header      | Title       | Here\'s this   |\n' +
			'| Paragraph   | Text        | And more      |';

		expect((await tmpParse(input)).trimStart()).
			toBe(
				'<table><thead><tr><th align="left">Syntax</th><th align="center">Description</th><th align="right">Test Text</th></tr></thead><tbody><tr><td align="left">Header</td><td align="center">Title</td><td align="right">Here\'s this</td></tr><tr><td align="left">Paragraph</td><td align="center">Text</td><td align="right">And more</td></tr></tbody></table>');
	});
});

describe('Formatting Text in Tables', () => {
	// TODO: Add unit tests here
	test(() => {
	});
});
