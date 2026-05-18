import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('HTML', () => {
	test('italic', async () => {
		const input = 'This **word** is bold. This <em>word</em> is italic.';

		const output = await tmpParse(input);
		expect(output).
			toBe(
				'<p>This <strong>word</strong> is bold. This <em>word</em> is italic.</p>');
	});

	test('bold', async () => {
		const input = 'This <strong>word</strong> is bold. This *word* is italic.';

		const output = await tmpParse(input);
		expect(output).
			toBe(
				'<p>This <strong>word</strong> is bold. This <em>word</em> is italic.</p>');
	});
});
