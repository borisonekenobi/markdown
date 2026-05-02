import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type {
	Blockquote as mdastBlockquote,
	Code,
	Definition as mdastDefinition,
	Delete,
	Emphasis,
	FootnoteDefinition as mdastFootnoteDefinition,
	FootnoteReference as mdastFootnoteReference,
	Heading as mdastHeading,
	Html,
	Image as mdastImage,
	ImageReference as mdastImageReference,
	InlineCode as mdastInlineCode,
	Link as mdastLink,
	LinkReference as mdastLinkReference,
	List as mdastList,
	ListItem as mdastListItem,
	Literal,
	Node,
	Paragraph as mdastParagraph,
	Parent,
	Root,
	RootContent,
	Strong,
	Table as mdastTable,
	TableCell as mdastTableCell,
	TableRow as mdastTableRow,
	Text as mdastText,
} from 'mdast';

import type {FileElement} from './models/file-element.js';
// import type {InlineCode} from './models/inline-code.js';
// import type {BlockElement} from './models/block-element.js';
import {Document} from './models/document.js';
import {CodeBlock} from './models/code-block.js';
import {Blockquote} from './models/blockquote.js';
import {Strikethrough} from './models/strikethrough.js';
import {Italic} from './models/italic.js';
import {FootnoteDefinition} from './models/footnote-definition.js';
import {Heading} from './models/heading.js';
import {Link} from './models/link.js';
import {Paragraph} from './models/paragraph.js';
import {Bold} from './models/bold.js';
import {InlineCode} from './models/inline-code.js';
import {Text} from './models/text.js';
import {Image} from './models/image.js';
import {HorizontalRule} from './models/horizontal-rule.js';
import {LineBreak} from './models/line-break.js';
import {List, ListElement} from './models/list.js';
import {HTML} from './models/html.js';
import {LinkReference} from './models/link-reference.js';
import {Definition} from './models/definition.js';
import {ImageReference} from './models/image-reference.js';
import {FootnoteReference} from './models/footnote-reference.js';
import {Table, TableCell, TableRow} from './models/table.js';

export function parseMarkdown(document: string): Document {
	return parseAST(unified().use(remarkParse).use(remarkGfm).parse(document));
}

function parseAST(ast: Root): Document {
	return new Document(ast.children.map(parseRootContent));
}

function parseRootContent(rootContent: RootContent): FileElement {
	if ('children' in rootContent) {
		return parseParent(rootContent);
	} else if ('value' in rootContent) {
		return parseLiteral(rootContent);
	} else {
		return parseNode(rootContent);
	}
}

function parseParent(parent: Parent): FileElement {
	switch (parent.type) {
		case 'blockquote':
			return parseBlockquote(parent as mdastBlockquote);
		case 'delete':
			return parseStrikethrough(parent as Delete);
		case 'emphasis':
			return parseItalic(parent as Emphasis);
		case 'footnoteDefinition':
			return parseFootnoteDefinition(parent as mdastFootnoteDefinition);
		case 'heading':
			return parseHeading(parent as mdastHeading);
		case 'link':
			return parseLink(parent as mdastLink);
		case 'linkReference':
			return parseLinkReference(parent as mdastLinkReference);
		case 'list':
			return parseList(parent as mdastList);
		case 'listItem':
			throw new Error('How did it even get here???');
		case 'paragraph':
			return parseParagraph(parent as mdastParagraph);
		case 'strong':
			return parseBold(parent as Strong);
		case 'table':
			return parseTable(parent as mdastTable);
		case 'tableCell':
		case 'tableRow':
			throw new Error('How did it even get here???');
		default:
			throw new Error(`Unrecognized parent type: ${parent.type}`);
	}
}

function parseLiteral(literal: Literal): FileElement {
	switch (literal.type) {
		case 'code':
			return parseCodeBlock(literal as Code);
		case 'html':
			return parseHTML(literal as Html);
		case 'inlineCode':
			return parseInlineCode(literal as mdastInlineCode);
		case 'text':
			return parseText(literal as mdastText);
		case 'yaml':
			throw new Error('Not implemented');
		default:
			throw new Error(`Unrecognized literal type: ${literal.type}`);
	}
}

function parseNode(node: Node): FileElement {
	switch (node.type) {
		case 'break':
			return parseLineBreak();
		case 'definition':
			return parseDefinition(node as mdastDefinition);
		case 'footnoteReference':
			return parseFootnoteReference(node as mdastFootnoteReference);
		case 'image':
			return parseImage(node as mdastImage);
		case 'imageReference':
			return parseImageReference(node as mdastImageReference);
		case 'thematicBreak':
			return parseHorizontalRule();
		default:
			throw new Error(`Unrecognized node type: ${node.type}`);
	}
}

function parseBlockquote(node: mdastBlockquote): Blockquote {
	return new Blockquote(node.children.map(parseRootContent));
}

function parseStrikethrough(node: Delete): Strikethrough {
	return new Strikethrough(node.children.map(parseRootContent));
}

function parseItalic(node: Emphasis): Italic {
	return new Italic(node.children.map(parseRootContent));
}

function parseFootnoteDefinition(node: mdastFootnoteDefinition): FootnoteDefinition {
	return new FootnoteDefinition(node.identifier,
		node.children.map(parseRootContent));
}

function parseHeading(node: mdastHeading): Heading {
	return new Heading(node.children.map(parseRootContent), node.depth);
}

function parseLink(node: mdastLink): Link {
	return new Link(node.children.map(parseRootContent), node.url,
		node.title ?? undefined);
}

function parseLinkReference(node: mdastLinkReference): LinkReference {
	return new LinkReference(node.children.map(parseRootContent),
		node.identifier, node.label ?? undefined);
}

function parseList(node: mdastList): List {
	return new List(node.ordered ?? false, node.children.map(parseListElement),
		node.start ?? undefined);
}

function parseListElement(node: mdastListItem): ListElement {
	return new ListElement(node.children.map(parseRootContent),
		node.checked ?? undefined);
}

function parseParagraph(node: mdastParagraph): Paragraph {
	return new Paragraph(node.children.map(parseRootContent));
}

function parseBold(node: Strong): Bold {
	return new Bold(node.children.map(parseRootContent));
}

function parseTable(node: mdastTable): Table {
	return new Table(node.children.map(parseTableRow),
		node.align ?? new Array(node.children.length).fill(null));
}

function parseTableRow(node: mdastTableRow): TableRow {
	return new TableRow(node.children.map(parseTableCell));
}

function parseTableCell(node: mdastTableCell): TableCell {
	return new TableCell(node.children.map(parseRootContent));
}

function parseCodeBlock(node: Code): CodeBlock {
	return new CodeBlock(node.value, node.lang ?? undefined);
}

function parseHTML(node: Html): HTML {
	return new HTML(node.value);
}

function parseInlineCode(node: mdastInlineCode): InlineCode {
	return new InlineCode(node.value);
}

function parseText(node: mdastText): Text {
	return new Text(node.value);
}

function parseLineBreak(): LineBreak {
	return new LineBreak();
}

function parseDefinition(node: mdastDefinition): Definition {
	return new Definition(node.identifier, node.url, node.label ?? undefined,
		node.title ?? undefined);
}

function parseFootnoteReference(node: mdastFootnoteReference): FootnoteReference {
	return new FootnoteReference(node.identifier, node.label ?? undefined);
}

function parseImage(node: mdastImage): Image {
	return new Image(node.url, node.alt ?? undefined, node.title ?? undefined);
}

function parseImageReference(node: mdastImageReference): ImageReference {
	return new ImageReference(node.identifier, node.referenceType,
		node.alt ?? undefined, node.label ?? undefined);
}

function parseHorizontalRule(): HorizontalRule {
	return new HorizontalRule();
}

