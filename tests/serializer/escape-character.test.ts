import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Escaping Characters', () => {
	test('simple', async () => {
		const input = '\\* Without the backslash, this would be a bullet in an unordered list.';

		expect(await tmpParse(input)).
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

		if (character === '<') {
			expect(await tmpParse(input)).toBe(`<p>&#x3C;</p>`);
		} else {
			expect(await tmpParse(input)).toBe(`<p>${character}</p>`);
		}
	});
});
