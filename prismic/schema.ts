import { Document } from "@prismicio/client/types/documents";

type FieldMappers<Entity extends Record<string, any>> = {
	[k in keyof Entity]: (doc: Document) => Entity[k];
};

export class Schema<Entity extends Record<string, any>> {
	private mappers: FieldMappers<Entity>;

	constructor(mappers: FieldMappers<Entity>) {
		this.mappers = mappers;
	}

	cast(doc: Document): Entity;
	cast<Key extends keyof Entity>(
		doc: Document,
		include: Key[]
	): Pick<Entity, Key>;
	cast<Key extends keyof Entity>(doc: Document, include?: Key[]) {
		let fields = include ?? (Object.keys(this.mappers) as Key[]);
		let entity = {} as Entity;

		for (const field of fields) {
			entity[field] = this.mappers[field](doc);
		}

		return entity;
	}
}
