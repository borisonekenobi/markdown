import type {BlockWithNoInline} from './block-element.js';

export class CodeBlock implements BlockWithNoInline {
	public code: string;
	public language?: string | undefined;

	public constructor(code: string, language?: string) {
		this.code = code;
		this.language = language;
	}

	public serialize(): string {
		return `\`\`\`${this.language ? this.language : ''}\n
		${this.code}\n
		\`\`\``;
	}
}
