import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Bold', () => {
	test('two asterisks', async () => {
		const input = 'I just love **bold text**.';

		expect(await tmpParse(input)).
			toBe('<p>I just love <strong>bold text</strong>.</p>');
	});

	test('two underscores', async () => {
		const input = 'I just love __bold text__.';

		expect(await tmpParse(input)).
			toBe('<p>I just love <strong>bold text</strong>.</p>');
	});

	test('two underscores in text', async () => {
		const input = 'Love**is**bold';

		expect(await tmpParse(input)).
			toBe('<p>Love<strong>is</strong>bold</p>');
	});

	test('two underscores in text', async () => {
		const input = 'Love__is__bold';

		expect(await tmpParse(input)).toBe('<p>Love__is__bold</p>');
	});
});

describe('Italic', () => {
	test('one asterisk', async () => {
		const input = 'Italicized text is the *cat\'s meow*.';

		expect(await tmpParse(input)).
			toBe('<p>Italicized text is the <em>cat\'s meow</em>.</p>');
	});

	test('one underscore', async () => {
		const input = 'Italicized text is the _cat\'s meow_.';

		expect(await tmpParse(input)).
			toBe('<p>Italicized text is the <em>cat\'s meow</em>.</p>');
	});

	test('one asterisk in text', async () => {
		const input = 'A*cat*meow';

		expect(await tmpParse(input)).toBe('<p>A<em>cat</em>meow</p>');
	});

	test('one underscore in text', async () => {
		const input = 'A_cat_meow';

		expect(await tmpParse(input)).toBe('<p>A_cat_meow</p>');
	});
});

describe('Bold and Italic', () => {
	test('three asterisks', async () => {
		const input = 'This text is ***really important***.';

		expect(await tmpParse(input)).
			toBe(
				'<p>This text is <em><strong>really important</strong></em>.</p>');
	});

	test('three underscores', async () => {
		const input = 'This text is ___really important___.';

		expect(await tmpParse(input)).
			toBe(
				'<p>This text is <em><strong>really important</strong></em>.</p>');
	});

	test('two underscores and one asterisk', async () => {
		const input = 'This text is __*really important*__.';

		expect(await tmpParse(input)).
			toBe(
				'<p>This text is <strong><em>really important</em></strong>.</p>');
	});

	test('two asterisks and one underscore', async () => {
		const input = 'This text is **_really important_**.';

		expect(await tmpParse(input)).
			toBe(
				'<p>This text is <strong><em>really important</em></strong>.</p>');
	});

	test('three asterisks in text', async () => {
		const input = 'This is really***very***important text.';

		expect(await tmpParse(input)).
			toBe(
				'<p>This is really<em><strong>very</strong></em>important text.</p>');
	});

	test('three underscores in text', async () => {
		const input = 'This is really___very___important text.';

		expect(await tmpParse(input)).
			toBe('<p>This is really___very___important text.</p>');
	});
});

describe('Others', () => {
	test('strikethrough', async () => {
		const input = '~~The world is flat.~~ We now know that the world is round.';

		expect(await tmpParse(input)).
			toBe(
				'<p><del>The world is flat.</del> We now know that the world is round.</p>');
	});

	test('highlight', async () => {
		const input = 'I need to highlight these ==very important words==.';

		expect(await tmpParse(input)).
			toBe(
				'<p>I need to highlight these <mark>very important words</mark>.</p>');
	});

	test('subscript', async () => {
		const input = 'H~2~O';

		expect(await tmpParse(input)).toBe('<p>H<sub>2</sub>O</p>');
	});

	test('superscript', async () => {
		const input = 'X^2^';

		expect(await tmpParse(input)).toBe('<p>X<sup>2</sup></p>');
	});
});
