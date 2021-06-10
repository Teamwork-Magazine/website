import { Document } from "@prismicio/client/types/documents";
import slugify from "slugify";
import { Field, FieldDefinition } from "./field";

type FieldMap<T extends Record<string, any>> = { [k in keyof T]: Field<T[k]> };

export type CastType<
	N extends string,
	T extends Record<string, any>,
	K extends keyof T = keyof T
> = WithStandardFields<N, Pick<T, K>>;

export class Model<N extends string, T extends Record<string, any>> {
	readonly name: N;
	readonly fields: FieldMap<T>;

	constructor(name: N, fields: FieldMap<T>) {
		this.name = name;
		this.fields = fields;
	}

	cast<K extends keyof T = keyof T>(
		doc: Document,
		include?: K[]
	): CastType<N, T, K> {
		const fields = {} as Pick<T, K>;
		const selectedFields = include ?? (Object.keys(this.fields) as K[]);

		selectedFields.forEach((key) => {
			const input = key === "uid" ? doc.uid : doc.data[key];
			const field = this.fields[key];
			fields[key] = field.cast(input, doc);
		});

		return {
			typeName: this.name,
			id: doc.id,
			tags: doc.tags.map((tag) => ({
				uid: slugify(tag),
				name: tag,
			})),
			...fields,
		};
	}

	toJSON(): ModelDefinition {
		const defintion: ModelDefinition = {
			Main: {},
		};

		Object.keys(this.fields).forEach((key) => {
			const { group, toJSON } = this.fields[key];

			if (!defintion[group]) {
				defintion[group] = {};
			}

			defintion[group][key] = toJSON();
		});

		return defintion;
	}
}

interface ModelDefinition {
	[k: string]: Record<string, FieldDefinition>;
}

export type WithStandardFields<N extends string, T> = T & {
	typeName: N;
	id: string;
	tags: Tag[];
};

interface Tag {
	uid: string;
	name: string;
}
