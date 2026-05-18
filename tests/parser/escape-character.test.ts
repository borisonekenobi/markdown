import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Escaping Characters', () => {
	test('simple', async () => {
		const input = '<p>* Without the backslash, this would be a bullet in an unordered list.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'\\* Without the backslash, this would be a bullet in an unordered list.\n');
	});

	test.each([
		'\\',
		'`',
		'*',
		'_',
		'[',
		'>',
		'#',
		'+',
		'-'])('escaping %s', async (character: string) => {
		const input = `<p>${character}</p>`;

		const output = await tmpSerialize(input);
		expect(output).toBe(`\\${character}\n`);
	});

	test.each([
		'{',
		'}',
		'<',
		'(',
		')',
		'.',
		'!',
		'|'])('escaping %s', async (character: string) => {
		const input = `<p>${character}</p>`;

		const output = await tmpSerialize(input);
		expect(output).toBe(`${character}\n`);
	});
});
