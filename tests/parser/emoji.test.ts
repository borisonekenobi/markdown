import {describe, expect, test} from 'vitest';
import {parse} from '../../src/index.js';

describe('Emoji', () => {
	test('copy-pasted', async () => {
		const input = '😂';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<p>😂</p>');
	});

	test('using emoji shortcodes', async () => {
		const input = 'Gone camping! :tent: Be back soon.\n' + '\n' +
			'That is so funny! :joy:';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>Gone camping! ⛺ Be back soon.</p>\n' +
				'<p>That is so funny! 😂</p>');
	});
});
