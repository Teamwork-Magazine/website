import classNames from "classnames";
import { RichText, RichTextBlock } from "prismic-reactjs";
import { Story } from "../../prismic/types/story";
import Blurb from "../atoms/Blurb";
import Byline from "../atoms/Byline";
import Headline from "../atoms/Headline";
import Stack from "../atoms/Stack";
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
	return (
		<header
			className={classNames(styles.header, "u-layout-grid", className)}
			data-layout={getLayout(story)}
		>
			<Stack
				gap="var(--space-s)"
				className={classNames(styles.summary, "u-layout-pull-left")}
			>
				<Headline className={styles.headline} size="xl" accent>
					{story.title}
				</Headline>
				{story.blurb && (
					<Blurb className={styles.blurb}>
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
				<Image
					{...story.coverImage}
					className={classNames(styles.image, "u-layout-wide")}
				/>
			)}
		</header>
	);
}
