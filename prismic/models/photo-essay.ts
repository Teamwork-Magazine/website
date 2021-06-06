import { Model } from "prismic/model";
import { SEO } from "./interfaces/seo";
import { Story } from "./interfaces/story";

export const PhotoEssay = new Model("photo-essay", {
	...Story(),
	...SEO(),
});
