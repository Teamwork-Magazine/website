import { image } from "prismic/fields/image";
import { richText } from "prismic/fields/rich-text";
import { title } from "prismic/fields/title";
import { Model } from "prismic/model";
import { Sluggable } from "./interfaces/sluggable";

export const Person = new Model("person", {
	name: title({ label: "Full Name" }).default(""),
	bio: richText({
		label: "Bio",
		allowMultiple: true,
		allowFormats: ["em", "strong", "hyperlink", "paragraph"],
	}),
	profileImage: image({
		label: "Profile Photo",
		constraint: { height: 600, width: 600 },
	}),
	...Sluggable(),
});
