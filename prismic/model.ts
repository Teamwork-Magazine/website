import { Document } from "@prismicio/client/types/documents";
import slugify from "slugify";
import { Field, FieldDefinition, UIDFieldDefinition } from "./field";

type FieldMap<T extends Record<string, any>> = { [k in keyof T]: Field<T[k]> };

export class Model<T extends Record<string, any>> {
	readonly name: string;
	readonly fields: FieldMap<T>;

	constructor(name: string, fields: FieldMap<T>) {
		this.name = name;
		this.fields = fields;
	}

	cast(doc: Document): WithStandardFields<T>;
	cast<K extends keyof T>(
		doc: Document,
		include: K[]
	): WithStandardFields<Pick<T, K>>;
	cast<K extends keyof T>(doc: Document, include?: K[]) {
		const fields = {} as Pick<T, K>;
		const selectedFields = include ?? (Object.keys(this.fields) as K[]);

		selectedFields.forEach((key) => {
			const input = key === "uid" ? doc.uid : doc.data[key];
			const field = this.fields[key];
			fields[key] = field.cast(input, doc);
		});

		return {
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

type WithStandardFields<T> = T & {
	id: string;
	uid: string;
	tags: Tag[];
};

interface Tag {
	uid: string;
	name: string;
}
