import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Bold', () => {
	test('strong tag', async () => {
		const input = '<p>I just love <strong>bold text</strong>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('I just love **bold text**.\n');
	});

	test('b tag', async () => {
		const input = '<p>I just love <b>bold text</b>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('I just love **bold text**.\n');
	});

	test('strong tag in text', async () => {
		const input = '<p>Love<strong>is</strong>bold</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('Love**is**bold\n');
	});

	test('b tag in text', async () => {
		const input = '<p>Love<b>is</b>bold</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('Love**is**bold\n');
	});
});

describe('Italic', () => {
	test('em tag', async () => {
		const input = '<p>Italicized text is the <em>cat\'s meow</em>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('Italicized text is the *cat\'s meow*.\n');
	});

	test('i tag', async () => {
		const input = '<p>Italicized text is the <i>cat\'s meow</i>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('Italicized text is the *cat\'s meow*.\n');
	});

	test('em tag in text', async () => {
		const input = '<p>A<em>cat</em>meow</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('A*cat*meow\n');
	});

	test('i tag in text', async () => {
		const input = '<p>A<i>cat</i>meow</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('A*cat*meow\n');
	});
});

describe('Bold and Italic', () => {
	test('strong and em tags', async () => {
		const input = '<p>This text is <em><strong>really important</strong></em>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('This text is ***really important***.\n');
	});

	test('b and i tags', async () => {
		const input = '<p>This text is <i><b>really important</b></i>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('This text is ***really important***.\n');
	});

	test('b and em tags', async () => {
		const input = '<p>This text is <b><em>really important</em></b>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('This text is ***really important***.\n');
	});

	test('strong and i tags', async () => {
		const input = '<p>This text is <strong><i>really important</i></strong>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('This text is ***really important***.\n');
	});

	test('strong and em tags in text', async () => {
		const input = '<p>This is really<em><strong>very</strong></em>important text.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('This is reall&#x79;***very***&#x69;mportant text.\n');
	});

	test('b and i tags in text', async () => {
		const input = '<p>This is really<i><b>very</i></b>important text.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('This is reall&#x79;***very***&#x69;mportant text.\n');
	});
});

describe('Others', () => {
	test('del tag', async () => {
		const input = '<p><del>The world is flat.</del> We now know that the world is round.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'~~The world is flat.~~ We now know that the world is round.\n');
	});

	test('s tag', async () => {
		const input = '<p><s>The world is flat.</s> We now know that the world is round.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'~~The world is flat.~~ We now know that the world is round.\n');
	});

	test('mark tag', async () => {
		const input = '<p>I need to highlight these <mark>very important words</mark>.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('I need to highlight these ==very important words==.\n');
	});

	test('sub tag', async () => {
		const input = '<p>H<sub>2</sub>O</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('H~2~O\n');
	});

	test('sup tag', async () => {
		const input = '<p>X<sup>2</sup></p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('X^2^\n');
	});
});
