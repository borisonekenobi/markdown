import {describe, expect, test} from 'vitest';
import {tmpSerialize} from '../../src/index.js';

describe('Code', () => {
	test('backticks', async () => {
		const input = '<p>At the command prompt, type <code>nano</code>.</p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('At the command prompt, type `nano`.\n');
	});

	test('escaping backticks', async () => {
		const input = '<p><code>Use `code` in your Markdown file.</code></p>';

		const output = await tmpSerialize(input);
		expect(output).toBe('``Use `code` in your Markdown file.``\n');
	});
});

describe('Code Blocks', () => {
	test('indents', async () => {
		const input = '<pre><code>&#x3C;html>\n' + '  &#x3C;head>\n' +
			'  &#x3C;/head>\n' + '&#x3C;/html>\n' + '</code></pre>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('```\n' +
				'<html>\n' +
				'  <head>\n' +
				'  </head>\n' +
				'</html>\n' +
				'```\n');
	});

	test('three backticks', async () => {
		const input = '<pre><code>{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' +
			'</code></pre>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('```\n' + '{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```\n');
	});

	test('three tildes', async () => {
		const input = '<pre><code>{\n' + '  "firstName": "John",\n' +
			'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' +
			'</code></pre>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('```\n' + '{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```\n');
	});
});

describe('Syntax Highlighting', () => {
	test('three backticks', async () => {
		const input = '<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>\n' +
			'  <span class="hljs-attr">"firstName"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"John"</span><span class="hljs-punctuation">,</span>\n' +
			'  <span class="hljs-attr">"lastName"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"Smith"</span><span class="hljs-punctuation">,</span>\n' +
			'  <span class="hljs-attr">"age"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">25</span>\n' +
			'<span class="hljs-punctuation">}</span>\n' + '</code></pre>';

		const output = await tmpSerialize(input);
		expect(output).
			toBe('```json\n' + '{\n' + '  "firstName": "John",\n' +
				'  "lastName": "Smith",\n' + '  "age": 25\n' + '}\n' + '```\n');
	});
});
