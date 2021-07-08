import { Field } from "../../field";

export function Sluggable() {
	const uid = new Field<string>({
		group: "SEO",
		cast(uid, doc): string {
			return typeof uid === "string" ? uid : doc.id;
		},
		toJSON() {
			return {
				type: "UID",
				config: {
					label: "Slug",
					placeholder: "url-slug",
				},
			};
		},
	});

	return { uid };
}
