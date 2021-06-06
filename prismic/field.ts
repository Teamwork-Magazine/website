interface FieldInit<T> {
	group: string;
	cast(input: any): T;
	toJSON(): FieldDefinition;
}

export class Field<T> {
	readonly group: string;
	readonly cast: (input: any) => T;
	readonly toJSON: () => FieldDefinition;

	constructor({ group, cast, toJSON }: FieldInit<T>) {
		this.group = group ?? "Main";
		this.cast = cast;
		this.toJSON = toJSON;
	}

	map<T2>(transform: (value: T) => T2): Field<T2> {
		const { group, cast, toJSON } = this;

		return new Field({
			group,
			cast: (input) => transform(cast(input)),
			toJSON,
		});
	}

	default(defaultValue: T): Field<T> {
		return this.map((value) => value ?? defaultValue);
	}
}

export type FieldDefinition =
	| RichTextFieldDefinition
	| ImageFieldDefinition
	| UIDFieldDefinition;

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
