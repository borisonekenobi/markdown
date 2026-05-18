import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Blockquotes', () => {
	test('simple', async () => {
		const input = '<blockquote>\n' +
			'<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n' +
			'</blockquote>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'> Dorothy followed her through many of the beautiful rooms in her castle.\n');
	});

	test('multiple paragraphs', async () => {
		const input = '<blockquote>\n' +
			'<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n' +
			'<p>The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>\n' +
			'</blockquote>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'> Dorothy followed her through many of the beautiful rooms in her castle.\n' +
				'>\n' +
				'> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.\n');
	});

	test('nested', async () => {
		const input = '<blockquote>\n' +
			'<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n' +
			'<blockquote>\n' +
			'<p>The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>\n' +
			'</blockquote>\n' + '</blockquote>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe(
				'> Dorothy followed her through many of the beautiful rooms in her castle.\n' +
				'>\n' +
				'> > The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.\n');
	});

	test('with other elements', async () => {
		const input = '<blockquote>\n' +
			'<h4>The quarterly results look great!</h4>\n' + '<ul>\n' +
			'<li>Revenue was off the chart.</li>\n' +
			'<li>Profits were higher than ever.</li>\n' + '</ul>\n' +
			'<p><em>Everything</em> is going according to <strong>plan</strong>.</p>\n' +
			'</blockquote>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('> #### The quarterly results look great!\n' + '>\n' +
				'> * Revenue was off the chart.\n' +
				'> * Profits were higher than ever.\n' + '>\n' +
				'> *Everything* is going according to **plan**.\n');
	});

	test('blank lines', async () => {
		const input = '<p>Without blank lines, this might not look right.</p>\n' +
			'<blockquote>\n' + '<p>This is a blockquote\n' +
			'Don\'t do this!</p>\n' + '</blockquote>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('Without blank lines, this might not look right.\n' + '\n' +
				'> This is a blockquote Don\'t do this!\n');
	});
});
