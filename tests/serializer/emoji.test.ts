import {describe, expect, test} from 'vitest';
import {serialize} from '../../src/index.js';

describe('Emoji', () => {
	test('copy-pasted', async () => {
		const input = '<p>😂</p>';

		const vfile = await serialize(input);
		const output = vfile.toString();
		expect(output).toBe('😂\n');
	});

	test('using literal emoji characters', async () => {
		const input = '<p>Gone camping! ⛺ Be back soon.</p>\n' +
			'<p>That is so funny! 😂</p>';

		const vfile = await serialize(input);
		const output = vfile.toString();
		expect(output).
			toBe('Gone camping! ⛺ Be back soon.\n' + '\n' +
				'That is so funny! 😂\n');
	});
});
