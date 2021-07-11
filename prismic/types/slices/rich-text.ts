import { RichTextBlock } from "prismic-reactjs";
import { PrismicSlice } from "../../interfaces";
import { Schema } from "../../schema";

interface PrismicRichTextSliceConfig {
	text: RichTextBlock[];
}

export type PrismicRichTextSlice = PrismicSlice<
	"rich_text",
	PrismicRichTextSliceConfig,
	never
>;

export interface RichTextSlice {
	type: "rich-text";
	blocks: RichTextBlock[];
}

export const RichTextSliceSchema = new Schema<
	PrismicRichTextSlice,
	RichTextSlice
>({
	type: () => "rich-text",
	blocks({ primary }) {
		return primary.text;
	},
});
