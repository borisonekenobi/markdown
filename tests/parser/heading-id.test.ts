import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Heading IDs', () => {
	test('simple', async () => {
		const input = '### My Great Heading {#custom-id}';

		expect(await tmpParse(input)).
			toBe('<h3 id="custom-id">My Great Heading</h3>');
	});
});

describe('Linking to Heading IDs', () => {
	test('simple', async () => {
		const input = '[Heading IDs](#heading-ids)';

		expect(await tmpParse(input)).
			toBe('<p><a href="#heading-ids">Heading IDs</a></p>');
	});
});
