import { image, ImageConfig } from "prismic/fields/image";
import { relationship } from "prismic/fields/relationship";
import { richText } from "prismic/fields/rich-text";
import { title } from "prismic/fields/title";
import { Person } from "../person";

export interface StoryConfig {
	featuredImage?: Pick<ImageConfig, "constraint" | "thumbnails">;
}

export function Story({ featuredImage }: StoryConfig = {}) {
	return {
		title: title({ label: "Title" }).default("Untitled"),
		blurb: richText({
			label: "Blurb",
			placeholder: "A short description or teaser",
			allowMultiple: false,
			allowFormats: ["paragraph", "em", "strong"],
		}),
		featuredImage: image({
			label: "Featured Image",
			...featuredImage,
		}),
		credit: relationship({
			label: "Credit",
			cast(subdocument) {
				return Person.cast(subdocument, ["name", "uid"]);
			},
			allowTypes: ["person"],
			fetchFields: {
				person: ["name", "uid"],
			},
		}),
	};
}
