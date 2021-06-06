import { Field } from "prismic/field";

export interface TextConfig {
	label: string;
	placeholder?: string;
	group?: string;
}

export function text({
	label,
	placeholder,
	group,
}: TextConfig): Field<string | null> {
	return new Field({
		group,
		cast(text) {
			return typeof text === "string" ? text : null;
		},
		toJSON() {
			return {
				type: "Text",
				config: {
					label,
					placeholder,
				},
			};
		},
	});
}
