import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Emoji', () => {
	test('copy-pasted', async () => {
		const input = '<p>😂</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('😂\n');
	});

	test('using emoji shortcodes', async () => {
		const input = '<p>Gone camping! ⛺ Be back soon.</p>\n' +
			'<p>That is so funny! 😂</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('Gone camping! ⛺ Be back soon.\n' + '\n' +
				'That is so funny! 😂\n');
	});
});
