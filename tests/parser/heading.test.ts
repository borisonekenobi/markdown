import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Heading', () => {
	test('parses h1 correctly', async () => {
		const input = '<h1>Heading level 1</h1>';

		const output = await tmpSerialize(input);
		expect(output).toBe('# Heading level 1\n');
	});

	test('parses h2 correctly', async () => {
		const input = '<h2>Heading level 2</h2>';

		const output = await tmpSerialize(input);
		expect(output).toBe('## Heading level 2\n');
	});

	test('parses h3 correctly', async () => {
		const input = '<h3>Heading level 3</h3>';

		const output = await tmpSerialize(input);
		expect(output).toBe('### Heading level 3\n');
	});

	test('parses h4 correctly', async () => {
		const input = '<h4>Heading level 4</h4>';

		const output = await tmpSerialize(input);
		expect(output).toBe('#### Heading level 4\n');
	});

	test('parses h5 correctly', async () => {
		const input = '<h5>Heading level 5</h5>';

		const output = await tmpSerialize(input);
		expect(output).toBe('##### Heading level 5\n');
	});

	test('parses h6 correctly', async () => {
		const input = '<h6>Heading level 6</h6>';

		const output = await tmpSerialize(input);
		expect(output).toBe('###### Heading level 6\n');
	});

	test.each([
		['<p>####### Heading level 7</p>', '\\####### Heading level 7\n'],
		['<p>######## Heading level 8</p>', '\\######## Heading level 8\n'],
		['<p>######### Heading level 9</p>', '\\######### Heading level 9\n'],
		[
			'<p>########## Heading level 10</p>',
			'\\########## Heading level 10\n'],
	])('parses h7+ to paragraph', async (html, markdown) => {
		expect(await tmpSerialize(html)).toBe(markdown);
	});

	test('parses alt h1 correctly', async () => {
		const input = '<h1>Heading level 1</h1>';

		const output = await tmpSerialize(input);
		expect(output).toBe('# Heading level 1\n');
	});

	test('parses alt h2 correctly', async () => {
		const input = '<h2>Heading level 2</h2>';

		const output = await tmpSerialize(input);
		expect(output).toBe('## Heading level 2\n');
	});

	test('no space parses to paragraph', async () => {
		const input = `<p>#Here\'s a Heading</p>`;

		const output = await tmpSerialize(input);
		expect(output).toBe('\\#Here\'s a Heading\n');
	});

	test('parse no blank lines correctly', async () => {
		const input = '<p>Without blank lines, this might not look right.</p>\n' +
			'<h1>Heading</h1>\n' +
			'<p>Don\'t do this!</p>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('Without blank lines, this might not look right.\n' +
				'\n' +
				'# Heading\n' +
				'\n' +
				'Don\'t do this!\n');
	});
});
