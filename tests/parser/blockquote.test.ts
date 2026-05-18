import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Blockquotes', () => {
	test('simple', async () => {
		const input = '> Dorothy followed her through many of the beautiful rooms in her castle.';

		expect(await tmpParse(input)).
			toBe('<blockquote>\n' +
				'<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n' +
				'</blockquote>');
	});

	test('multiple paragraphs', async () => {
		const input = '> Dorothy followed her through many of the beautiful rooms in her castle.\n' +
			'>\n' +
			'> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.';

		expect(await tmpParse(input)).
			toBe('<blockquote>\n' +
				'<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n' +
				'<p>The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>\n' +
				'</blockquote>');
	});

	test('nested', async () => {
		const input = '> Dorothy followed her through many of the beautiful rooms in her castle.\n' +
			'>\n' +
			'>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.';

		expect(await tmpParse(input)).
			toBe('<blockquote>\n' +
				'<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>\n' +
				'<blockquote>\n' +
				'<p>The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>\n' +
				'</blockquote>\n' + '</blockquote>');
	});

	test('with other elements', async () => {
		const input = '> #### The quarterly results look great!\n' + '>\n' +
			'> - Revenue was off the chart.\n' +
			'> - Profits were higher than ever.\n' + '>\n' +
			'>  *Everything* is going according to **plan**.';

		expect(await tmpParse(input)).
			toBe('<blockquote>\n' +
				'<h4>The quarterly results look great!</h4>\n' + '<ul>\n' +
				'<li>Revenue was off the chart.</li>\n' +
				'<li>Profits were higher than ever.</li>\n' + '</ul>\n' +
				'<p><em>Everything</em> is going according to <strong>plan</strong>.</p>\n' +
				'</blockquote>');
	});

	test('blank lines', async () => {
		const input = 'Without blank lines, this might not look right.\n' +
			'> This is a blockquote\n' + 'Don\'t do this!';

		expect(await tmpParse(input)).
			toBe('<p>Without blank lines, this might not look right.</p>\n' +
				'<blockquote>\n' +
				'<p>This is a blockquote\n' +
				'Don\'t do this!</p>\n' +
				'</blockquote>');
	});
});
