import {describe, expect, test} from 'vitest';
import {serialize} from '../../src/index.js';

describe('Heading IDs', () => {
	test('simple', async () => {
		const input = '<h3 id="custom-id">My Great Heading</h3>';

		const vfile = await serialize(input);
		const output = vfile.toString();
		expect(output).toBe('### My Great Heading {#custom-id}\n');
	});
});

describe('Linking to Heading IDs', () => {
	test('simple', async () => {
		const input = '<p><a href="#heading-ids">Heading IDs</a></p>';

		const vfile = await serialize(input);
		const output = vfile.toString();
		expect(output).toBe('[Heading IDs](#heading-ids)\n');
	});
});
