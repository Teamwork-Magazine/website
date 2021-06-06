import { Model } from "prismic/model";
import { SEO } from "./interfaces/seo";
import { Story } from "./interfaces/story";

export const Longform = new Model("longform", {
	...Story(),
	...SEO(),
});
