import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Paragraphs', () => {
	test('blank lines parse correctly', async () => {
		const input = 'I really like using Markdown.\n' + '\n' +
			'I think I\'ll use it to format all of my documents from now on.';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p>I really like using Markdown.</p>\n' +
				'<p>I think I\'ll use it to format all of my documents from now on.</p>');
	});

	test('indent lines parse correctly', async () => {
		const input = '    This can result in unexpected formatting problems.\n' +
			'\n' + '  Don\'t add tabs or spaces in front of paragraphs.';

		const output = await tmpParse(input);
		expect(output).
			toBe(
				'<pre><code>This can result in unexpected formatting problems.\n' +
				'</code></pre>\n' +
				'<p>Don\'t add tabs or spaces in front of paragraphs.</p>');
	});

	test('line breaks parse correctly', async () => {
		const input = 'This is the first line.  \n' +
			'And this is the second line.';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p>This is the first line.<br>\n' +
				'And this is the second line.</p>');
	});

	test('line breaks with slashes parse correctly', async () => {
		const input = 'First line with a backslash after.\\\n' +
			'And the next line.\n' + '\n' + 'First line with nothing after.\n' +
			'And the next line.';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p>First line with a backslash after.<br>\n' +
				'And the next line.</p>\n' +
				'<p>First line with nothing after.\n' +
				'And the next line.</p>');
	});
});
