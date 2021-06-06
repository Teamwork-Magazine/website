import { Document } from "@prismicio/client/types/documents";

type TransformFn<To, From = unknown> = (input: From, doc: Document) => To;

interface FieldInit<T> {
	group?: string;
	cast: TransformFn<T>;
	toJSON(): FieldDefinition;
}

export class Field<T> {
	readonly group: string;
	readonly cast: TransformFn<T>;
	readonly toJSON: () => FieldDefinition;

	constructor({ group, cast, toJSON }: FieldInit<T>) {
		this.group = group ?? "Main";
		this.cast = cast;
		this.toJSON = toJSON;
	}

	map<T2>(transform: TransformFn<T2, T>): Field<T2> {
		const { group, cast, toJSON } = this;

		return new Field({
			group,
			cast: (input, doc) => transform(cast(input, doc), doc),
			toJSON,
		});
	}

	default(
		defaultValue: Exclude<T, null | undefined>
	): Field<Exclude<T, null | undefined>> {
		return this.map((value) => (isNotNullish(value) ? value : defaultValue));
	}
}

function isNotNullish<T>(value: T): value is Exclude<T, null | undefined> {
	return value !== null && value !== undefined;
}

export type FieldDefinition =
	| RichTextFieldDefinition
	| ImageFieldDefinition
	| UIDFieldDefinition
	| TextFieldDefinition;

export interface RichTextFieldDefinition {
	type: "StructuredText";
	config: RichTextConfig;
}

export type RichTextConfig = SingleRichTextConfig | MultiRichTextConfig;

export interface SharedRichTextConfig {
	label: string;
	placeholder?: string;
	imageConstraint?: ImageConstraint;
}

export interface SingleRichTextConfig extends SharedRichTextConfig {
	single: string;
	useAsTitle?: true;
}

export interface MultiRichTextConfig extends SharedRichTextConfig {
	multi: string;
}

export interface ImageFieldDefinition {
	type: "Image";
	config: ImageFieldConfig;
}

export interface ImageFieldConfig {
	label: string;
	placeholder?: string;
	constraint: NullableImageConstraint;
	thumbnails: Thumbnail[];
}

export interface ImageConstraint {
	height: number;
	width: number;
}

export interface NullableImageConstraint {
	height: number | null;
	width: number | null;
}

export interface Thumbnail extends ImageConstraint {
	name: string;
}

export interface UIDFieldDefinition {
	type: "UID";
	config: UIDFieldConfig;
}

export interface UIDFieldConfig {
	label: string;
	placeholder?: string;
}

export interface TextFieldDefinition {
	type: "Text";
	config: TextFieldConfig;
}

export interface TextFieldConfig {
	label: string;
	placeholder?: string;
}
