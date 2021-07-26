import classNames from "classnames";
import { RichText, RichTextBlock } from "prismic-reactjs";
import Stack from "../atoms/Stack";
import PullQuote from "../molecules/PullQuote";
import ImageGallery from "../molecules/ImageGallery";
import ArticleCardGrid from "../organisms/ArticleCardGrid";
import styles from "./Article.module.css";
import { Story, StorySlice } from "../../prismic/types/story";
import ArticleHeader from "../organisms/ArticleHeader";
import AccentHeading from "../atoms/AccentHeading";

export interface ArticleProps {
	story: Story;
	recommendedStories: Story[];
}

export default function Article({ story, recommendedStories }: ArticleProps) {
	return (
		<main>
			<article>
				<Stack gap="var(--space-xl)">
					<ArticleHeader story={story} className={styles.header} />
					<div className={classNames(styles.body, "u-layout-grid")}>
						{story.body.map((slice, i) => (
							<ArticleBodySlice slice={slice} key={i} />
						))}
					</div>
					<footer className={classNames(styles.footer, "u-layout-grid")}>
						<Stack gap="var(--space-l-xl)" className="u-layout-wide">
							<AccentHeading level={2}>Recommended Stories</AccentHeading>
							<ArticleCardGrid stories={recommendedStories} />
						</Stack>
					</footer>
				</Stack>
			</article>
		</main>
	);
}

interface ArticleBodySliceProps {
	slice: StorySlice;
}

function ArticleBodySlice({ slice }: ArticleBodySliceProps) {
	switch (slice.type) {
		case "rich-text":
			return (
				<Stack gap="var(--space-s)">
					<RichText render={slice.blocks} />
				</Stack>
			);
		case "pull-quote":
			return (
				<div className="u-layout-pull-right">
					<PullQuote
						quote={RichText.render(slice.quote)}
						attribution={
							slice.attribution && RichText.render(slice.attribution)
						}
					/>
				</div>
			);
		case "images":
			return (
				<div
					className={classNames({
						"u-layout-wide": slice.extraWide,
					})}
				>
					<ImageGallery
						images={slice.gallery}
						layout={slice.layout}
						alignImages={slice.alignImages}
					/>
				</div>
			);
		default:
			return null;
	}
}
