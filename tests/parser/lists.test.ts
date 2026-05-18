import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Ordered Lists', () => {
	test('in order counting', async () => {
		const input = '1. First item\n' + '2. Second item\n' +
			'3. Third item\n' + '4. Fourth item';

		expect(await tmpParse(input)).
			toBe('<ol>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item</li>\n' + '<li>Fourth item</li>\n' + '</ol>');
	});

	test('same number', async () => {
		const input = '1. First item\n' + '1. Second item\n' +
			'1. Third item\n' + '1. Fourth item';

		expect(await tmpParse(input)).
			toBe('<ol>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item</li>\n' + '<li>Fourth item</li>\n' + '</ol>');
	});

	test('random number after first', async () => {
		const input = '1. First item\n' + '8. Second item\n' +
			'3. Third item\n' + '5. Fourth item';

		expect(await tmpParse(input)).
			toBe('<ol>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item</li>\n' + '<li>Fourth item</li>\n' + '</ol>');
	});

	test('sublist', async () => {
		const input = '1. First item\n' + '2. Second item\n' +
			'3. Third item\n' + '    1. Indented item\n' +
			'    2. Indented item\n' + '4. Fourth item';

		expect(await tmpParse(input)).
			toBe('<ol>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item\n' + '<ol>\n' + '<li>Indented item</li>\n' +
				'<li>Indented item</li>\n' + '</ol>\n' + '</li>\n' +
				'<li>Fourth item</li>\n' + '</ol>');
	});

	test('invalid delimiter', async () => {
		const input = '1) First item\n' + '2) Second item';

		expect(await tmpParse(input)).
			toBe('<ol>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'</ol>');
	});
});

describe('Unordered Lists', () => {
	test('dashes', async () => {
		const input = '- First item\n' + '- Second item\n' + '- Third item\n' +
			'- Fourth item';

		expect(await tmpParse(input)).
			toBe('<ul>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item</li>\n' + '<li>Fourth item</li>\n' + '</ul>');
	});

	test('asterisks', async () => {
		const input = '* First item\n' + '* Second item\n' + '* Third item\n' +
			'* Fourth item';

		expect(await tmpParse(input)).
			toBe('<ul>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item</li>\n' + '<li>Fourth item</li>\n' + '</ul>');
	});

	test('pluses', async () => {
		const input = '+ First item\n' + '+ Second item\n' + '+ Third item\n' +
			'+ Fourth item';

		expect(await tmpParse(input)).
			toBe('<ul>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item</li>\n' + '<li>Fourth item</li>\n' + '</ul>');
	});

	test('sublist', async () => {
		const input = '- First item\n' + '- Second item\n' + '- Third item\n' +
			'    - Indented item\n' + '    - Indented item\n' + '- Fourth item';

		expect(await tmpParse(input)).
			toBe('<ul>\n' + '<li>First item</li>\n' + '<li>Second item</li>\n' +
				'<li>Third item\n' + '<ul>\n' + '<li>Indented item</li>\n' +
				'<li>Indented item</li>\n' + '</ul>\n' + '</li>\n' +
				'<li>Fourth item</li>\n' + '</ul>');
	});

	test('starting with number', async () => {
		const input = '- 1968\\. A great year!\n' +
			'- I think 1969 was second best.';

		expect(await tmpParse(input)).
			toBe('<ul>\n' + '<li>1968. A great year!</li>\n' +
				'<li>I think 1969 was second best.</li>\n' + '</ul>');
	});

	test('mixed delimiters', async () => {
		const input = '+ First item\n' + '* Second item\n' + '- Third item\n' +
			'+ Fourth item';

		expect(await tmpParse(input)).
			toBe('<ul>\n' + '<li>First item</li>\n' + '</ul>\n' + '<ul>\n' +
				'<li>Second item</li>\n' + '</ul>\n' + '<ul>\n' +
				'<li>Third item</li>\n' + '</ul>\n' + '<ul>\n' +
				'<li>Fourth item</li>\n' + '</ul>');
	});
});

describe('Task Lists', () => {
	test('simple', async () => {
		const input = '- [x] Write the press release\n' +
			'- [ ] Update the website\n' +
			'- [ ] Contact the media';

		expect(await tmpParse(input)).
			toBe('<ul class="contains-task-list">\n' +
				'<li class="task-list-item"><input type="checkbox" checked disabled> Write the press release</li>\n' +
				'<li class="task-list-item"><input type="checkbox" disabled> Update the website</li>\n' +
				'<li class="task-list-item"><input type="checkbox" disabled> Contact the media</li>\n' +
				'</ul>');
	});
});

describe('Elements in Lists', () => {
	test('paragraphs', async () => {
		const input = '* This is the first list item.\n' +
			'* Here\'s the second list item.\n' +
			'\n' +
			'    I need to add another paragraph below the second list item.\n' +
			'\n' +
			'* And here\'s the third list item.';

		expect(await tmpParse(input)).
			toBe('<ul>\n' +
				'<li>\n' +
				'<p>This is the first list item.</p>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>Here\'s the second list item.</p>\n' +
				'<p>I need to add another paragraph below the second list item.</p>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>And here\'s the third list item.</p>\n' +
				'</li>\n' +
				'</ul>');
	});

	test('blockquotes', async () => {
		const input = '* This is the first list item.\n' +
			'* Here\'s the second list item.\n' +
			'\n' +
			'    > A blockquote would look great below the second list item.\n' +
			'\n' +
			'* And here\'s the third list item.';

		expect(await tmpParse(input)).
			toBe('<ul>\n' +
				'<li>\n' +
				'<p>This is the first list item.</p>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>Here\'s the second list item.</p>\n' +
				'<blockquote>\n' +
				'<p>A blockquote would look great below the second list item.</p>\n' +
				'</blockquote>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>And here\'s the third list item.</p>\n' +
				'</li>\n' +
				'</ul>');
	});

	test('code blocks', async () => {
		const input = '1. Open the file.\n' +
			'2. Find the following code block on line 21:\n' +
			'\n' +
			'        <html>\n' +
			'          <head>\n' +
			'            <title>Test</title>\n' +
			'          </head>\n' +
			'\n' +
			'3. Update the title to match the name of your website.';

		expect(await tmpParse(input)).
			toBe('<ol>\n' +
				'<li>\n' +
				'<p>Open the file.</p>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>Find the following code block on line 21:</p>\n' +
				'<pre><code> &#x3C;html>\n' +
				'   &#x3C;head>\n' +
				'     &#x3C;title>Test&#x3C;/title>\n' +
				'   &#x3C;/head>\n' +
				'</code></pre>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>Update the title to match the name of your website.</p>\n' +
				'</li>\n' +
				'</ol>');
	});

	test('images', async () => {
		const input = '1. Open the file containing the Linux mascot.\n' +
			'2. Marvel at its beauty.\n' +
			'\n' +
			'    ![Tux, the Linux mascot](/assets/images/tux.png)\n' +
			'\n' +
			'3. Close the file.';

		expect(await tmpParse(input)).
			toBe('<ol>\n' +
				'<li>\n' +
				'<p>Open the file containing the Linux mascot.</p>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>Marvel at its beauty.</p>\n' +
				'<p><img src="/assets/images/tux.png" alt="Tux, the Linux mascot"></p>\n' +
				'</li>\n' +
				'<li>\n' +
				'<p>Close the file.</p>\n' +
				'</li>\n' +
				'</ol>');
	});

	test('lists', async () => {
		const input = '1. First item\n' +
			'2. Second item\n' +
			'3. Third item\n' +
			'    - Indented item\n' +
			'    - Indented item\n' +
			'4. Fourth item';

		expect(await tmpParse(input)).
			toBe('<ol>\n' +
				'<li>First item</li>\n' +
				'<li>Second item</li>\n' +
				'<li>Third item\n' +
				'<ul>\n' +
				'<li>Indented item</li>\n' +
				'<li>Indented item</li>\n' +
				'</ul>\n' +
				'</li>\n' +
				'<li>Fourth item</li>\n' +
				'</ol>');
	});
});
