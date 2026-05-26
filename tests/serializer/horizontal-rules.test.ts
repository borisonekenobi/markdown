import {describe, expect, test} from 'vitest';
import {serialize} from '../../src/index.js';

describe('Horizontal Rules', () => {
	test('hr tag', async () => {
		const input = '<hr>';

		const vfile = await serialize(input);
		const output = vfile.toString();
		expect(output).toBe('---\n');
	});

	test('blank lines', async () => {
		const input = '<h2>Without blank lines, this would be a heading.</h2>\n' +
			'<p>Don\'t do this!</p>';

		const vfile = await serialize(input);
		const output = vfile.toString();
		expect(output).toBe(
			'## Without blank lines, this would be a heading.\n' +
			'\n' +
			'Don\'t do this!\n');
	});
});