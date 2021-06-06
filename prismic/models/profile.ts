import { Model } from "prismic/model";
import { SEO } from "./interfaces/seo";
import { Story } from "./interfaces/story";

export const Profile = new Model("profile", {
	...Story(),
	...SEO(),
});
