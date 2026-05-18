import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Footnotes', () => {
	test('simple', async () => {
		const input = '<p>Here\'s a simple footnote,<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup> and here\'s a longer one.<sup><a href="#user-content-fn-bignote" id="user-content-fnref-bignote" data-footnote-ref="" aria-describedby="footnote-label">2</a></sup></p>\n' +
			'<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">Footnotes</h2>\n' +
			'<ol>\n' +
			'<li id="user-content-fn-1">\n' +
			'<p>This is the first footnote. <a href="#user-content-fnref-1" data-footnote-backref="" aria-label="Back to reference 1" class="data-footnote-backref">↩</a></p>\n' +
			'</li>\n' +
			'<li id="user-content-fn-bignote">\n' +
			'<p>Here\'s one with multiple paragraphs and code.</p>\n' +
			'<p>Indent paragraphs to include them in the footnote.</p>\n' +
			'<p><code>{ my code }</code></p>\n' +
			'<p>Add as many paragraphs as you like. <a href="#user-content-fnref-bignote" data-footnote-backref="" aria-label="Back to reference 2" class="data-footnote-backref">↩</a></p>\n' +
			'</li>\n' +
			'</ol>\n' +
			'</section>';

		const output = await tmpSerialize(input);
		expect(output).toBe(
			'Here\'s a simple footnote,[^1] and here\'s a longer one.[^bignote]\n' +
			'\n' +
			'[^1]: This is the first footnote.\n' +
			'\n' +
			'[^bignote]: Here\'s one with multiple paragraphs and code.\n' +
			'\n' +
			'    Indent paragraphs to include them in the footnote.\n' +
			'\n' +
			'    `{ my code }`\n' +
			'\n' +
			'    Add as many paragraphs as you like.\n',
		);
	});
});
