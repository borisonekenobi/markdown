import {describe, expect, test} from 'vitest';
import {tmpParse} from '../../src/index.js';

describe('Definition Lists', () => {
	test('italic', async () => {
		const input = 'First Term\n' +
			': This is the definition of the first term.\n' + '\n' +
			'Second Term\n' + ': This is one definition of the second term.\n' +
			': This is another definition of the second term.';

		expect(await tmpParse(input)).
			toBe('<dl>\n' + '<dt>First Term</dt>\n' +
				'<dd>This is the definition of the first term.\n' + '</dd>\n' +
				'<dt>Second Term</dt>\n' +
				'<dd>This is one definition of the second term.\n' + '</dd>\n' +
				'<dd>This is another definition of the second term.\n' +
				'</dd>\n' + '</dl>');
	});
});
