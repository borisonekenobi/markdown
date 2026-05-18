import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Horizontal Rules', () => {
	test('three asterisks', async () => {
		const input = '***';

		expect(await tmpParse(input)).toBe('<hr>');
	});

	test('three dashes', async () => {
		const input = '---';

		expect(await tmpParse(input)).toBe('<hr>');
	});

	test('three underscores', async () => {
		const input = '___';

		expect(await tmpParse(input)).toBe('<hr>');
	});

	test('blank lines', async () => {
		const input = 'Without blank lines, this would be a heading.\n' +
			'---\n' +
			'Don\'t do this!';

		expect(await tmpParse(input)).toBe(
			'<h2>Without blank lines, this would be a heading.</h2>\n' +
			'<p>Don\'t do this!</p>');
	});
});
