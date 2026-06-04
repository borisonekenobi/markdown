import {beforeEach, describe, expect, test, vi} from 'vitest';
import type {VFile} from 'vfile';
import {normalize} from '../../src/index.js';
import {parse} from '../../src/parse.js';
import {serialize} from '../../src/serialize.js';

vi.mock('../../src/serialize.js', () => ({
	serialize: vi.fn(),
}));

vi.mock('../../src/parse.js', () => ({
	parse: vi.fn(),
}));

const mockedSerialize = vi.mocked(serialize);
const mockedParse = vi.mocked(parse);

describe('normalize', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('serializes html and parses the normalized markdown', async () => {
		const html = '<h1>Heading level 1</h1>';
		const markdown = {
			toString: () => '# Heading level 1\n',
		} as unknown as VFile;
		const expected = {value: '<h1>Heading level 1</h1>'} as VFile;

		mockedSerialize.mockResolvedValueOnce(markdown);
		mockedParse.mockResolvedValueOnce(expected);

		const result = await normalize(html);

		expect(mockedSerialize).toHaveBeenCalledTimes(1);
		expect(mockedSerialize).toHaveBeenCalledWith(html);
		expect(mockedParse).toHaveBeenCalledTimes(1);
		expect(mockedParse).toHaveBeenCalledWith('# Heading level 1\n');
		expect(result).toBe(expected);
	});

	test('converts the serialized value to a string before parsing',
		async () => {
			const html = '<p>Example</p>';
			const markdown = {
				toString: () => 'Example markdown',
			} as unknown as VFile;
			const expected = {value: '<p>Example</p>'} as VFile;

			mockedSerialize.mockResolvedValueOnce(markdown);
			mockedParse.mockResolvedValueOnce(expected);

			await normalize(html);

			expect(mockedParse).toHaveBeenCalledWith('Example markdown');
		});

	test('propagates serialize failures without parsing', async () => {
		const error = new Error('serialize failed');

		mockedSerialize.mockRejectedValueOnce(error);

		await expect(normalize('<p>Broken</p>')).
			rejects.toThrow('serialize failed');
		expect(mockedParse).not.toHaveBeenCalled();
	});

	test('propagates parse failures', async () => {
		const error = new Error('parse failed');
		const markdown = {
			toString: () => 'Example markdown',
		} as unknown as VFile;

		mockedSerialize.mockResolvedValueOnce(markdown);
		mockedParse.mockRejectedValueOnce(error);

		await expect(normalize('<p>Broken</p>')).
			rejects.toThrow('parse failed');
	});
});
