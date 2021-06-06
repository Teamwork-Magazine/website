import { RichText } from "prismic-reactjs";
import { Field } from "prismic/field";

interface TitleConfig {
	label: string;
	placeholder?: string;
	group?: string;
	defaultValue?: string;
}

export function title({
	label,
	placeholder,
	group,
	defaultValue = "",
}: TitleConfig): Field<string> {
	return new Field({
		group,
		cast(title) {
			if (title && Array.isArray(title) && title.length > 0) {
				return RichText.asText(title);
			}

			return defaultValue;
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
