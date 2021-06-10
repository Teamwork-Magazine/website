import { Document } from "@prismicio/client/types/documents";
import { Field } from "prismic/field";

type Subdocument<TypeName extends string> = Document & { type: TypeName };

type TransformFn<To, From extends Subdocument<string>> = (
	subdocument: From
) => To;

export interface RelationshipConfig<To, TypeName extends string = string> {
	label: string;
	placeholder?: string;
	group?: string;
	cast: TransformFn<To, Subdocument<TypeName>>;
	allowTypes?: TypeName[];
	allowTags?: string[];
	fetchFields?: string[] | { [k in TypeName]?: string[] };
}

export function relationship<To, TypeName extends string = string>({
	label,
	placeholder,
	group,
	cast,
	allowTypes,
	allowTags,
	fetchFields,
}: RelationshipConfig<To, TypeName>): Field<To | null> {
	return new Field({
		group,
		onRequest(options) {
			if (!allowTypes || !fetchFields) return options;

			allowTypes.forEach((typeName) => {
				const fields = Array.isArray(fetchFields)
					? fetchFields
					: fetchFields[typeName];
				if (!fields) return;
				fields.forEach((field) => {
					options.fetchLinks.add(`${typeName}.${field}`);
				});
			});

			return options;
		},
		cast(subdocument) {
			if (!isSubdocument(subdocument, allowTypes)) {
				return null;
			}

			return cast(subdocument);
		},
		toJSON() {
			return {
				type: "Link",
				config: {
					select: "document",
					label,
					placeholder,
					customtypes: allowTypes,
					tags: allowTags,
				},
			};
		},
	});
}

function isSubdocument<TypeName extends string = string>(
	value: unknown,
	allow?: TypeName[]
): value is Subdocument<TypeName> {
	if (!isDocument(value)) return false;

	if (!allow) {
		return true;
	} else {
		return allow.includes(value.type as TypeName);
	}
}

function isDocument(value: unknown): value is Document {
	return (
		typeof value === "object" &&
		value !== null &&
		typeof (value as Document).type !== "string"
	);
}
