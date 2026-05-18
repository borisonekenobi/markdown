import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Horizontal Rules', () => {
	test('hr tag', async () => {
		const input = '<hr>';

		const output = await tmpSerialize(input);
		expect(output).toBe('---\n');
	});

	test('blank lines', async () => {
		const input = '<h2>Without blank lines, this would be a heading.</h2>\n' +
			'<p>Don\'t do this!</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe(
			'## Without blank lines, this would be a heading.\n' +
			'\n' +
			'Don\'t do this!\n');
	});
});
