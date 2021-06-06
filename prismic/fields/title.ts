import { RichText } from "prismic-reactjs";
import { Field } from "prismic/field";

export interface TitleConfig {
	label: string;
	placeholder?: string;
	group?: string;
}

export function title({
	label,
	placeholder,
	group,
}: TitleConfig): Field<string | null> {
	return new Field({
		group,
		cast(title) {
			if (title && Array.isArray(title) && title.length > 0) {
				return RichText.asText(title);
			}

			return null;
		},
		toJSON() {
			return {
				type: "StructuredText",
				config: {
					label,
					placeholder,
					single: "heading1",
					useAsTitle: true,
				},
			};
		},
	});
}
