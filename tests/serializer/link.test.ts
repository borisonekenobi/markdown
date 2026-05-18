import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Links', () => {
	test('simple', async () => {
		const input = '<p>My favorite search engine is <a href="https://duckduckgo.com">Duck Duck Go</a>.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'My favorite search engine is [Duck Duck Go](https://duckduckgo.com).\n');
	});

	test('title', async () => {
		const input = '<p>My favorite search engine is <a href="https://duckduckgo.com" title="The best search engine for privacy">Duck Duck Go</a>.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").\n');
	});
});

describe('URLs and Email Addresses', () => {
	test('quick url', async () => {
		const input = '<p><a href="https://www.markdownguide.org">https://www.markdownguide.org</a></p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('<https://www.markdownguide.org>\n');
	});

	test('quick email address', async () => {
		const input = '<p><a href="mailto:fake@example.com">fake@example.com</a></p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('<fake@example.com>\n');
	});

	test('automatic url linking', async () => {
		const input = '<p><a href="http://www.example.com">http://www.example.com</a></p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('<http://www.example.com>\n');
	});

	test('disabling automatic url linking', async () => {
		const input = '<p><code>http://www.example.com</code></p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('`http://www.example.com`\n');
	});
});

describe('Formatting Links', () => {
	test('bold', async () => {
		const input = '<p>I love supporting the <strong><a href="https://eff.org">EFF</a></strong>.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('I love supporting the **[EFF](https://eff.org)**.\n');
	});

	test('italic', async () => {
		const input = '<p>This is the <em><a href="https://www.markdownguide.org">Markdown Guide</a></em>.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'This is the *[Markdown Guide](https://www.markdownguide.org)*.\n');
	});

	test('code', async () => {
		const input = '<p>See the section on <a href="#code"><code>code</code></a>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('See the section on [`code`](#code).\n');
	});
});

describe('Reference-style Links', () => {
	test('simple', async () => {
		const input = '<p>In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends\n' +
			'of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to\n' +
			'eat: it was a <a href="https://en.wikipedia.org/wiki/Hobbit#Lifestyle" title="Hobbit lifestyles">hobbit-hole</a>, and that means comfort.</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a [hobbit-hole](https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"), and that means comfort.\n');
	});
});

describe('Best Practices', () => {
	test('link with spaces', async () => {
		const input = '<p>[link](<a href="https://www.example.com/my">https://www.example.com/my</a> great page)</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('\\[link]\\(<https://www.example.com/my> great page)\n');
	});

	test('link with parentheses', async () => {
		const input = '<p><a href="https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_(novel)">a novel</a></p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'[a novel](https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_\\(novel\\))\n');
	});
});
