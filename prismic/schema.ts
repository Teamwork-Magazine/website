import { isPromise } from "../lib/async/is-promise";

type FieldMappers<Source, Entity extends Record<string, any>> = {
	[k in keyof Entity]: (src: Source) => Entity[k] | Promise<Entity[k]>;
};

export class Schema<Source, Entity extends Record<string, any>> {
	private mappers: FieldMappers<Source, Entity>;

	constructor(mappers: FieldMappers<Source, Entity>) {
		this.mappers = mappers;
	}

	cast(src: Source): Promise<Entity>;
	cast<Key extends keyof Entity>(
		src: Source,
		include: Key[]
	): Promise<Pick<Entity, Key>>;
	async cast<Key extends keyof Entity>(src: Source, include?: Key[]) {
		let fields = include ?? (Object.keys(this.mappers) as Key[]);
		let entity = {} as Entity;

		for (const field of fields) {
			const value = this.mappers[field](src);
			entity[field] = isPromise(value) ? await value : value;
		}

		return entity;
	}

	castSync(src: Source): Entity;
	castSync<Key extends keyof Entity>(
		src: Source,
		include: Key[]
	): Pick<Entity, Key>;
	castSync<Key extends keyof Entity>(src: Source, include?: Key[]) {
		let fields = include ?? (Object.keys(this.mappers) as Key[]);
		let entity = {} as Entity;

		for (const field of fields) {
			const value = this.mappers[field](src);

			if (isPromise(value)) {
				throw new Error(
					`Cannot cast field "${field}" with castSync: "${field}" is an async field`
				);
			}

			entity[field] = value;
		}

		return entity;
	}

	extend<NextEntity extends Entity>(
		mappers: FieldMappers<Source, Omit<NextEntity, keyof Entity>>
	): Schema<Source, NextEntity> {
		return new Schema<Source, NextEntity>({
			...this.mappers,
			...mappers,
		} as FieldMappers<Source, NextEntity>);
	}
}
