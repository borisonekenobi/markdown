import {describe, expect, test} from 'vitest';
import {parse} from '../../src/index.js';

describe('Horizontal Rules', () => {
	test('three asterisks', async () => {
		const input = '***';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<hr>');
	});

	test('three dashes', async () => {
		const input = '---';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<hr>');
	});

	test('three underscores', async () => {
		const input = '___';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<hr>');
	});

	test('blank lines', async () => {
		const input = 'Without blank lines, this would be a heading.\n' +
			'---\n' +
			'Don\'t do this!';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe(
			'<h2>Without blank lines, this would be a heading.</h2>\n' +
			'<p>Don\'t do this!</p>');
	});
});
