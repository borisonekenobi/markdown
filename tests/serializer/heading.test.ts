import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Heading', () => {
	test('parses h1 correctly', async () => {
		const input = '# Heading level 1';

		expect(await tmpParse(input)).toBe('<h1>Heading level 1</h1>');
	});

	test('parses h2 correctly', async () => {
		const input = '## Heading level 2';

		expect(await tmpParse(input)).toBe('<h2>Heading level 2</h2>');
	});

	test('parses h3 correctly', async () => {
		const input = '### Heading level 3';

		expect(await tmpParse(input)).toBe('<h3>Heading level 3</h3>');
	});

	test('parses h4 correctly', async () => {
		const input = '#### Heading level 4';

		expect(await tmpParse(input)).toBe('<h4>Heading level 4</h4>');
	});

	test('parses h5 correctly', async () => {
		const input = '##### Heading level 5';

		expect(await tmpParse(input)).toBe('<h5>Heading level 5</h5>');
	});

	test('parses h6 correctly', async () => {
		const input = '###### Heading level 6';

		expect(await tmpParse(input)).toBe('<h6>Heading level 6</h6>');
	});

	test.each([
		['####### Heading level 7', '<p>####### Heading level 7</p>'],
		['######## Heading level 8', '<p>######## Heading level 8</p>'],
		['######### Heading level 9', '<p>######### Heading level 9</p>'],
		['########## Heading level 10', '<p>########## Heading level 10</p>'],
	])('parses h7+ to paragraph', async (markdown, html) => {
		expect(await tmpParse(markdown)).toBe(html);
	});

	test('parses alt h1 correctly', async () => {
		const input = 'Heading level 1\n' +
			'===============';

		expect(await tmpParse(input)).toBe('<h1>Heading level 1</h1>');
	});

	test('parses alt h2 correctly', async () => {
		const input = 'Heading level 2\n' +
			'---------------';

		expect(await tmpParse(input)).toBe('<h2>Heading level 2</h2>');
	});

	test('no space parses to paragraph', async () => {
		const input = '#Here\'s a Heading';

		expect(await tmpParse(input)).toBe(`<p>${input}</p>`);
	});

	test('parse no blank lines correctly', async () => {
		const input = 'Without blank lines, this might not look right.\n' +
			'# Heading\n' +
			'Don\'t do this!';

		expect(await tmpParse(input)).
			toBe('<p>Without blank lines, this might not look right.</p>\n' +
				'<h1>Heading</h1>\n' +
				'<p>Don\'t do this!</p>');
	});
});
