import { text } from "prismic/fields/text";
import { title } from "prismic/fields/title";
import { Model } from "prismic/model";

export const Stockist = new Model("stockist", {
	name: title({ label: "Name" }),
	location: text({ label: "Location" }),
});
