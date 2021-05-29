import { RichText, RichTextBlock } from "prismic-reactjs";
import { Schema } from "prismic/schema";
import { AuthorLink, AuthorSchema } from "./author";
import { CategoryLink, CategorySchema } from "./category";
import { fromPrismic, Image, PrismicImage } from "./image";

export interface Article {
	id: string;
	slug: string;
	title: string;
	featuredImage: Image | null;
	thumbnail: Image | null;
	authors: AuthorLink[];
	category: CategoryLink | null;
	blurb: RichTextBlock[] | null;
}

export const ArticleSchema = new Schema<Article>({
	id(doc) {
		return doc.id;
	},
	slug(doc) {
		return doc.uid ?? doc.id;
	},
	title(doc) {
		const { title = [] } = doc.data;
		return RichText.asText(title);
	},
	featuredImage(doc) {
		const image: PrismicImage = doc.data.featured_image;
		return image ? fromPrismic(image) : null;
	},
	thumbnail(doc) {
		const thumbnail: PrismicImage = doc.data.featured_image?.Thumbnail;
		return thumbnail ? fromPrismic(thumbnail) : null;
	},
	authors(doc) {
		const { authors = [] } = doc.data;
		return authors.map(({ author }) =>
			AuthorSchema.cast(author, ["slug", "name"])
		);
	},
	category(doc) {
		const { category } = doc.data;
		return category && category.isBroken === false
			? CategorySchema.cast(category, ["slug", "name"])
			: null;
	},
	blurb(doc) {
		const { blurb = [] } = doc.data;
		return blurb.length ? blurb : null;
	},
});
