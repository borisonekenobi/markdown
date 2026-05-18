import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Emoji', () => {
	test('copy-pasted', async () => {
		const input = '😂';

		const output = await tmpParse(input);
		expect(output).toBe('<p>😂</p>');
	});

	test('using emoji shortcodes', async () => {
		const input = 'Gone camping! :tent: Be back soon.\n' + '\n' +
			'That is so funny! :joy:';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p>Gone camping! ⛺ Be back soon.</p>\n' +
				'<p>That is so funny! 😂</p>');
	});
});
