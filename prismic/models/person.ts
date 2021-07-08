import { image } from "../fields/image";
import { richText } from "../fields/rich-text";
import { title } from "../fields/title";
import { Model } from "../model";
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
