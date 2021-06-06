import { Field } from "prismic/field";

export function SEO() {
	return {
		uid: new Field<string>({
			group: "SEO",
			cast(uid) {
				return uid || null;
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
		}),
	};
}
