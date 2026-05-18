import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Heading IDs', () => {
	test('simple', async () => {
		const input = '### My Great Heading {#custom-id}';

		const output = await tmpParse(input);
		expect(output).
			toBe('<h3 id="custom-id">My Great Heading</h3>');
	});
});

describe('Linking to Heading IDs', () => {
	test('simple', async () => {
		const input = '[Heading IDs](#heading-ids)';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p><a href="#heading-ids">Heading IDs</a></p>');
	});
});
