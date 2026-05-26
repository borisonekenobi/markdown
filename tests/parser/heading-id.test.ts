import {describe, expect, test} from 'vitest';
import {parse} from '../../src/index.js';

describe('Heading IDs', () => {
	test('simple', async () => {
		const input = '### My Great Heading {#custom-id}';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<h3 id="custom-id">My Great Heading</h3>');
	});
});

describe('Linking to Heading IDs', () => {
	test('simple', async () => {
		const input = '[Heading IDs](#heading-ids)';

		const vfile = await parse(input);
		const output = vfile.toString();
		expect(output).
			toBe('<p><a href="#heading-ids">Heading IDs</a></p>');
	});
});
