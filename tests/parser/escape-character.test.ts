import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Escaping Characters', () => {
	test('simple', async () => {
		const input = '\\* Without the backslash, this would be a bullet in an unordered list.';

		const output = await tmpParse(input);
		expect(output).
			toBe(
				'<p>* Without the backslash, this would be a bullet in an unordered list.</p>');
	});

	test.each([
		'\\',
		'`',
		'*',
		'_',
		'{',
		'}',
		'[',
		']',
		'<',
		'>',
		'(',
		')',
		'#',
		'+',
		'-',
		'.',
		'!',
		'|'])('escaping %s', async (character: string) => {
		const input = `\\${character}`;

		const output = await tmpParse(input);
		if (character === '<') {
			expect(output).toBe(`<p>&#x3C;</p>`);
		} else {
			expect(output).toBe(`<p>${character}</p>`);
		}
	});
});
