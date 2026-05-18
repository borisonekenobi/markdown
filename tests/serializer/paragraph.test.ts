import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Paragraphs', () => {
	test('blank lines parse correctly', async () => {
		const input = '<p>I really like using Markdown.</p>\n' +
			'<p>I think I\'ll use it to format all of my documents from now on.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe(
			'I really like using Markdown.\n' + '\n' +
			'I think I\'ll use it to format all of my documents from now on.\n',
		);
	});

	test('indent lines parse correctly', async () => {
		const input = '<p>This can result in unexpected formatting problems.</p>\n' +
			'<p>Don\'t add tabs or spaces in front of paragraphs.</p>';

		const output = await tmpSerialize(input);
		expect(output).not.
			toBe('    This can result in unexpected formatting problems.\n' +
				'\n' + '  Don\'t add tabs or spaces in front of paragraphs.\n');
	});

	test('line breaks parse correctly', async () => {
		const input = '<p>This is the first line.<br>\n' +
			'And this is the second line.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('This is the first line.\\\n' +
				'And this is the second line.\n');
	});

	test('line breaks with slashes parse correctly', async () => {
		const input = '<p>First line with a backslash after.<br>\n' +
			'And the next line.</p>\n' +
			'<p>First line with nothing after.\n' +
			'And the next line.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('First line with a backslash after.\\\n' +
				'And the next line.\n' +
				'\n' +
				'First line with nothing after. And the next line.\n');
	});
});
