import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Links', () => {
	test('simple', async () => {
		const input = 'My favorite search engine is [Duck Duck Go](https://duckduckgo.com).';

		expect(await tmpParse(input)).
			toBe(
				'<p>My favorite search engine is <a href="https://duckduckgo.com">Duck Duck Go</a>.</p>');
	});

	test('title', async () => {
		const input = 'My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").';

		expect(await tmpParse(input)).
			toBe(
				'<p>My favorite search engine is <a href="https://duckduckgo.com" title="The best search engine for privacy">Duck Duck Go</a>.</p>');
	});
});

describe('URLs and Email Addresses', () => {
	test('quick url', async () => {
		const input = '<https://www.markdownguide.org>';

		expect(await tmpParse(input)).
			toBe(
				'<p><a href="https://www.markdownguide.org">https://www.markdownguide.org</a></p>');
	});

	test('quick email address', async () => {
		const input = '<fake@example.com>';

		expect(await tmpParse(input)).
			toBe(
				'<p><a href="mailto:fake@example.com">fake@example.com</a></p>');
	});

	test('automatic url linking', async () => {
		const input = 'http://www.example.com';

		expect(await tmpParse(input)).
			toBe(
				'<p><a href="http://www.example.com">http://www.example.com</a></p>');
	});

	test('disabling automatic url linking', async () => {
		const input = '`http://www.example.com`';

		expect(await tmpParse(input)).
			toBe('<p><code>http://www.example.com</code></p>');
	});
});

describe('Formatting Links', () => {
	test('bold', async () => {
		const input = 'I love supporting the **[EFF](https://eff.org)**.';

		expect(await tmpParse(input)).
			toBe(
				'<p>I love supporting the <strong><a href="https://eff.org">EFF</a></strong>.</p>');
	});

	test('italic', async () => {
		const input = 'This is the *[Markdown Guide](https://www.markdownguide.org)*.';

		expect(await tmpParse(input)).
			toBe(
				'<p>This is the <em><a href="https://www.markdownguide.org">Markdown Guide</a></em>.</p>');
	});

	test('code', async () => {
		const input = 'See the section on [`code`](#code).';

		expect(await tmpParse(input)).
			toBe(
				'<p>See the section on <a href="#code"><code>code</code></a>.</p>');
	});
});

describe('Reference-style Links', () => {
	test('simple', async () => {
		const input = 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends\n' +
			'of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to\n' +
			'eat: it was a [hobbit-hole][1], and that means comfort.\n' +
			'\n' +
			'[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"';

		expect(await tmpParse(input)).toBe(
			'<p>In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends\n' +
			'of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to\n' +
			'eat: it was a <a href="https://en.wikipedia.org/wiki/Hobbit#Lifestyle" title="Hobbit lifestyles">hobbit-hole</a>, and that means comfort.</p>');
	});
});

describe('Best Practices', () => {
	test('link with spaces', async () => {
		const input = '[link](https://www.example.com/my great page)';

		expect(await tmpParse(input)).
			toBe(
				'<p>[link](<a href="https://www.example.com/my">https://www.example.com/my</a> great page)</p>');
	});

	test('link with parentheses', async () => {
		const input = '[a novel](https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_(novel))';

		expect(await tmpParse(input)).
			toBe(
				'<p><a href="https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_(novel)">a novel</a></p>');
	});
});
