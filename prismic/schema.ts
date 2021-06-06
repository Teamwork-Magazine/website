type FieldMappers<Source, Entity extends Record<string, any>> = {
	[k in keyof Entity]: (src: Source) => Entity[k];
};

export class Schema<Source, Entity extends Record<string, any>> {
	private mappers: FieldMappers<Source, Entity>;

	constructor(mappers: FieldMappers<Source, Entity>) {
		this.mappers = mappers;
	}

	cast(src: Source): Entity;
	cast<Key extends keyof Entity>(
		src: Source,
		include: Key[]
	): Pick<Entity, Key>;
	cast<Key extends keyof Entity>(src: Source, include?: Key[]) {
		let fields = include ?? (Object.keys(this.mappers) as Key[]);
		let entity = {} as Entity;

		for (const field of fields) {
			entity[field] = this.mappers[field](src);
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
