import { RichTextBlock } from "prismic-reactjs";
import { PrismicSlice } from "../../interfaces";
import { Schema } from "../../schema";

interface PrismicPullQuoteSliceConfig {
	quote: RichTextBlock[];
	attribution: RichTextBlock[];
}

export type PrismicPullQuoteSlice = PrismicSlice<
	"pullquote",
	PrismicPullQuoteSliceConfig,
	never
>;

export interface PullQuoteSlice {
	type: "pull-quote";
	quote: RichTextBlock[];
	attribution: RichTextBlock[] | null;
}

export const PullQuoteSliceSchema = new Schema<
	PrismicPullQuoteSlice,
	PullQuoteSlice
>({
	type: () => "pull-quote",
	quote({ primary }) {
		return primary.quote;
	},
	attribution({ primary }) {
		return primary.attribution.length ? primary.attribution : null;
	},
});
