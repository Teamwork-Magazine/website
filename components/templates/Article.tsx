import classNames from "classnames";
import { RichText } from "prismic-reactjs";
import Stack from "../atoms/Stack";
import PullQuote from "../molecules/PullQuote";
import ImageGallery from "../molecules/ImageGallery";
import ArticleCardGrid from "../organisms/ArticleCardGrid";
import styles from "./Article.module.css";
import { Story, StorySlice } from "../../prismic/types/story";
import ArticleHeader from "../organisms/ArticleHeader";
import Section from "../molecules/Section";
import SectionHeader from "../molecules/SectionHeader";
import RichTextSection from "../organisms/RichTextSection";
import { useMemo } from "react";
import { DateTime } from "luxon";
import TagCloud from "../molecules/TagCloud";

export interface ArticleProps {
	story: Story;
	recommendedStories: Story[];
}

export default function Article({ story, recommendedStories }: ArticleProps) {
	const { publishedAt: rawPublishedAt, updatedAt: rawUpdatedAt } = story;

	const publishedAt = useMemo(() => {
		if (!rawPublishedAt) return null;
		return DateTime.fromISO(rawPublishedAt);
	}, [rawPublishedAt]);

	const updatedAt = useMemo(() => {
		if (!rawUpdatedAt) return null;

		const updatedAt = DateTime.fromISO(rawUpdatedAt);
		if (publishedAt && updatedAt.equals(publishedAt)) return null;

		return updatedAt;
	}, [publishedAt, rawUpdatedAt]);

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
					<footer>
						<Section className={styles.metadata}>
							<div className={classNames(styles.dates, "u-layout-wide")}>
								<Stack gap="var(--space-2xs)">
									{publishedAt ? (
										<p>
											Published on{" "}
											<time dateTime={publishedAt.toISO()}>
												{publishedAt.toLocaleString(DateTime.DATE_FULL)}
											</time>
										</p>
									) : null}
									{updatedAt ? (
										<p>
											Last updated on{" "}
											<time dateTime={updatedAt.toISO()}>
												{updatedAt.toLocaleString(DateTime.DATETIME_FULL)}
											</time>
										</p>
									) : null}
								</Stack>
							</div>
							{story.tags.length ? (
								<TagCloud
									tags={story.tags}
									className={classNames(styles.tags, "u-layout-wide")}
								/>
							) : null}
						</Section>
						<Section>
							<Stack gap="var(--space-l-xl)" className="u-layout-wide">
								<SectionHeader>
									<SectionHeader.Heading>
										Recommended Stories
									</SectionHeader.Heading>
								</SectionHeader>
								<ArticleCardGrid stories={recommendedStories} />
							</Stack>
						</Section>
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
			return <RichTextSection slice={slice} />;
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
