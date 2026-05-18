import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Code', () => {
	test('backticks', async () => {
		const input = 'At the command prompt, type `nano`.';

		expect(await tmpParse(input)).
			toBe('<p>At the command prompt, type <code>nano</code>.</p>');
	});

	test('escaping backticks', async () => {
		const input = '``Use `code` in your Markdown file.``';

		expect(await tmpParse(input)).
			toBe('<p><code>Use `code` in your Markdown file.</code></p>');
	});
});

describe('Code Blocks', () => {
	test('indents', async () => {
		const input = '    <html>\n' + '      <head>\n' + '      </head>\n' +
			'    </html>';

		expect(await tmpParse(input)).
			toBe('<pre><code>&#x3C;html>\n' + '  &#x3C;head>\n' +
				'  &#x3C;/head>\n' + '&#x3C;/html>\n' + '</code></pre>');
	});

	test('three backticks', async () => {
		const input = '```\n' + '{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```';

		expect(await tmpParse(input)).
			toBe('<pre><code>{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' +
				'</code></pre>');
	});

	test('three tildes', async () => {
		const input = '~~~\n' + '{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '~~~';

		expect(await tmpParse(input)).
			toBe('<pre><code>{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' +
				'</code></pre>');
	});
});

describe('Syntax Highlighting', () => {
	test('three backticks', async () => {
		const input = '```json\n' + '{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```';

		expect(await tmpParse(input)).
			toBe(
				'<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>\n' +
				'  <span class="hljs-attr">"firstName"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"John"</span><span class="hljs-punctuation">,</span>\n' +
				'  <span class="hljs-attr">"lastName"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"Smith"</span><span class="hljs-punctuation">,</span>\n' +
				'  <span class="hljs-attr">"age"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span>\n' +
				'<span class="hljs-punctuation">}</span>\n' + '</code></pre>');
	});
});
