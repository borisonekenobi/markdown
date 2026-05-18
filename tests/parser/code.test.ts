import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Code', () => {
	test('backticks', async () => {
		const input = 'At the command prompt, type `nano`.';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p>At the command prompt, type <code>nano</code>.</p>');
	});

	test('escaping backticks', async () => {
		const input = '``Use `code` in your Markdown file.``';

		const output = await tmpParse(input);
		expect(output).
			toBe('<p><code>Use `code` in your Markdown file.</code></p>');
	});
});

describe('Code Blocks', () => {
	test('indents', async () => {
		const input = '    <html>\n' + '      <head>\n' + '      </head>\n' +
			'    </html>';

		const output = await tmpParse(input);
		expect(output).
			toBe('<pre><code>&#x3C;html>\n' + '  &#x3C;head>\n' +
				'  &#x3C;/head>\n' + '&#x3C;/html>\n' + '</code></pre>');
	});

	test('three backticks', async () => {
		const input = '```\n' + '{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```';

		const output = await tmpParse(input);
		expect(output).
			toBe('<pre><code>{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' +
				'</code></pre>');
	});

	test('three tildes', async () => {
		const input = '~~~\n' + '{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '~~~';

		const output = await tmpParse(input);
		expect(output).
			toBe('<pre><code>{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' +
				'</code></pre>');
	});
});

describe('Syntax Highlighting', () => {
	test('three backticks', async () => {
		const input = '```json\n' + '{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```';

		const output = await tmpParse(input);
		expect(output).
			toBe(
				'<pre><code class="hljs language-json"><span class="punctuation">{</span>\n' +
				'  <span class="attr">"firstName"</span><span class="punctuation">:</span> <span class="string">"John"</span><span class="punctuation">,</span>\n' +
				'  <span class="attr">"lastName"</span><span class="punctuation">:</span> <span class="string">"Smith"</span><span class="punctuation">,</span>\n' +
				'  <span class="attr">"age"</span><span class="punctuation">:</span> <span class="number">25</span>\n' +
				'<span class="punctuation">}</span>\n' + '</code></pre>');
	});
});
