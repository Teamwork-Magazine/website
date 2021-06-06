import { RichTextBlock } from "prismic-reactjs";
import { Field } from "prismic/field";

const ALL_FORMATS = [
	"paragraph",
	"preformatted",
	"heading1",
	"heading2",
	"heading3",
	"heading4",
	"heading5",
	"heading6",
	"strong",
	"em",
	"hyperlink",
	"image",
	"embed",
	"list-item",
	"o-list-item",
	"rtl",
] as const;

type Format = typeof ALL_FORMATS[number];

interface RichTextConfig {
	label: string;
	placeholder?: string;
	group?: string;
	allowMultiple?: boolean;
	allowFormats?: readonly Format[];
}

export function richText({
	label,
	placeholder,
	group,
	allowMultiple = false,
	allowFormats: formats = ALL_FORMATS,
}: RichTextConfig): Field<RichTextBlock[]> {
	return new Field({
		group,
		cast(richText) {
			if (richText && Array.isArray(richText)) {
				return richText;
			}

			return [];
		},
		toJSON() {
			const config = {
				label,
				placeholder,
			};

			return {
				type: "StructuredText",
				config: allowMultiple
					? {
							...config,
							multi: formats.join(", "),
					  }
					: {
							...config,
							single: formats.join(", "),
					  },
			};
		},
	});
}
