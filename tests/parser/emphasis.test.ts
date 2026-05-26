import {describe, expect, test} from 'vitest';
import {parse} from '../../src/index.js';

describe('Bold', () => {
	test('two asterisks', async () => {
		const input = 'I just love **bold text**.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>I just love <strong>bold text</strong>.</p>');
	});

	test('two underscores', async () => {
		const input = 'I just love __bold text__.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>I just love <strong>bold text</strong>.</p>');
	});

	test('two asterisks in text', async () => {
		const input = 'Love**is**bold';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>Love<strong>is</strong>bold</p>');
	});

	test('two underscores in text', async () => {
		const input = 'Love__is__bold';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<p>Love__is__bold</p>');
	});
});

describe('Italic', () => {
	test('one asterisk', async () => {
		const input = 'Italicized text is the *cat\'s meow*.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>Italicized text is the <em>cat\'s meow</em>.</p>');
	});

	test('one underscore', async () => {
		const input = 'Italicized text is the _cat\'s meow_.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>Italicized text is the <em>cat\'s meow</em>.</p>');
	});

	test('one asterisk in text', async () => {
		const input = 'A*cat*meow';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<p>A<em>cat</em>meow</p>');
	});

	test('one underscore in text', async () => {
		const input = 'A_cat_meow';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<p>A_cat_meow</p>');
	});
});

describe('Bold and Italic', () => {
	test('three asterisks', async () => {
		const input = 'This text is ***really important***.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p>This text is <em><strong>really important</strong></em>.</p>');
	});

	test('three underscores', async () => {
		const input = 'This text is ___really important___.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p>This text is <em><strong>really important</strong></em>.</p>');
	});

	test('two underscores and one asterisk', async () => {
		const input = 'This text is __*really important*__.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p>This text is <strong><em>really important</em></strong>.</p>');
	});

	test('two asterisks and one underscore', async () => {
		const input = 'This text is **_really important_**.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p>This text is <strong><em>really important</em></strong>.</p>');
	});

	test('three asterisks in text', async () => {
		const input = 'This is really***very***important text.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p>This is really<em><strong>very</strong></em>important text.</p>');
	});

	test('three underscores in text', async () => {
		const input = 'This is really___very___important text.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p>This is really___very___important text.</p>');
	});
});

describe('Others', () => {
	test('strikethrough', async () => {
		const input = '~~The world is flat.~~ We now know that the world is round.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p><del>The world is flat.</del> We now know that the world is round.</p>');
	});

	test('highlight', async () => {
		const input = 'I need to highlight these ==very important words==.';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe(
				'<p>I need to highlight these <mark>very important words</mark>.</p>');
	});

	test('subscript', async () => {
		const input = 'H~2~O';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<p>H<sub>2</sub>O</p>');
	});

	test('superscript', async () => {
		const input = 'X^2^';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).toBe('<p>X<sup>2</sup></p>');
	});
});
