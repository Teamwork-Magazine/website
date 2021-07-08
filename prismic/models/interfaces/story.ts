import { image, ImageConfig } from "../../fields/image";
import { relationship } from "../../fields/relationship";
import { richText } from "../../fields/rich-text";
import { title } from "../../fields/title";
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
