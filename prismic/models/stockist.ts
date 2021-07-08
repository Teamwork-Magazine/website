import { text } from "../fields/text";
import { title } from "../fields/title";
import { Model } from "../model";

export const Stockist = new Model("stockist", {
	name: title({ label: "Name" }),
	location: text({ label: "Location" }),
});
