import classNames from "classnames";
import { RichText } from "prismic-reactjs";
import { Story } from "../../prismic/types/story";
import Blurb from "../atoms/Blurb";
import Byline from "../atoms/Byline";
import Headline from "../atoms/Headline";
import Stack from "../atoms/Stack";
import ArticleKicker from "../molecules/ArticleKicker";
import Image from "../molecules/Image";
import styles from "./ArticleHeader.module.css";

type ArticleHeaderLayout = "no-image" | "landscape-image" | "portrait-image";

function getLayout(story: Story): ArticleHeaderLayout {
	if (!story.coverImage) {
		return "no-image";
	}

	const { height, width } = story.coverImage;
	const aspectRatio = width / height;

	return aspectRatio > 1 ? "landscape-image" : "portrait-image";
}

export interface ArticleHeaderProps {
	story: Story;
	className?: string;
}

export default function ArticleHeader({
	story,
	className,
}: ArticleHeaderProps) {
	const layout = getLayout(story);

	return (
		<header
			className={classNames(styles.header, "u-layout-grid", className)}
			data-layout={layout}
		>
			<Stack gap="var(--space-s)" className={styles.summary}>
				<ArticleKicker
					className={styles.kicker}
					story={story}
					size="lg"
					prefer={["category", "tag"]}
				/>
				<Headline className={styles.headline} size="xl" accent>
					{story.title}
				</Headline>
				{story.blurb && (
					<Blurb className={styles.blurb} size="lg">
						<RichText render={story.blurb} />
					</Blurb>
				)}
				<div className={styles.bylines}>
					<Stack gap="var(--space-2xs)">
						<Byline people={story.authors} />
						{story.photographers && (
							<Byline people={story.photographers} prefix="Photos" />
						)}
					</Stack>
				</div>
			</Stack>
			{story.coverImage && (
				// eslint-disable-next-line jsx-a11y/alt-text
				<Image
					{...story.coverImage}
					className={classNames(styles.image, {
						"u-layout-wide": layout === "landscape-image",
					})}
				/>
			)}
		</header>
	);
}
