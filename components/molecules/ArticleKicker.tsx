import { ComponentType } from "react";
import { Story } from "../../prismic/types/story";
import Kicker, { KickerProps } from "../atoms/Kicker";

export type ArticleKickerSource = "featured" | "category" | "tag";

interface ArticleKickerOwnProps {
	story: Story;
	prefer?: ArticleKickerSource | ArticleKickerSource[];
}

export type ArticleKickerProps = ArticleKickerOwnProps &
	Omit<KickerProps, "href" | "children">;

type ResolvedArticleKickerProps = Omit<ArticleKickerProps, "prefer">;

const matchers: Record<ArticleKickerSource, (story: Story) => boolean> = {
	featured: (story) => story.featured,
	category: (story) => story.section !== null,
	tag: (story) => story.tags.length > 0,
};

const components: Record<
	ArticleKickerSource,
	ComponentType<ResolvedArticleKickerProps>
> = {
	featured: FeaturedArticleKicker,
	category: CategoryArticleKicker,
	tag: TagArticleKicker,
};

export default function ArticleKicker({
	story,
	prefer = ["category"],
	...props
}: ArticleKickerProps) {
	const preferences = new Set(Array.isArray(prefer) ? prefer : [prefer]);

	for (const preference of preferences) {
		const isMatch = matchers[preference](story);

		if (isMatch) {
			const KickerComponent = components[preference];
			return <KickerComponent story={story} {...props} />;
		}
	}

	return <FallbackArticleKicker story={story} {...props} />;
}

function FeaturedArticleKicker({
	story: _,
	...props
}: ResolvedArticleKickerProps) {
	return <Kicker {...props}>Featured</Kicker>;
}

function CategoryArticleKicker({
	story,
	...props
}: ResolvedArticleKickerProps) {
	const category = story.section!;

	return <Kicker {...props}>{category.name}</Kicker>;
}

function TagArticleKicker({ story, ...props }: ResolvedArticleKickerProps) {
	const tag = story.tags[0];
	return <Kicker {...props}>{tag.name}</Kicker>;
}

function FallbackArticleKicker({
	story: _,
	...props
}: ResolvedArticleKickerProps) {
	return <Kicker {...props}>Uncategorized</Kicker>;
}
