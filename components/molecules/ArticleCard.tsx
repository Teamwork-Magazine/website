import classNames from "classnames";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { HeadingLevel } from "../atoms/Heading";
import Headline from "../atoms/Headline";
import Blurb from "../atoms/Blurb";
import Image from "./Image";
import useClickableGroup from "../../lib/hooks/useClickableGroup";
import styles from "./ArticleCard.module.css";
import { Story } from "../../prismic/types/story";
import placeholder from "../../public/thumbnail-placeholder.png";
import { Image as ImageData } from "../../prismic/types/image";
import Byline from "../atoms/Byline";
import Kicker from "../atoms/Kicker";
import { ReactNode } from "react";

const PLACEHOLDER_THUMBNAIL: ImageData = {
	...placeholder,
	alt: "",
	credit: null,
};

type ArticleCardLayout = "normal" | "featured";

export interface ArticleCardProps {
	story: Story;
	className?: string;
	level?: HeadingLevel;
	layout?: ArticleCardLayout;
}

export default function ArticleCard({
	story,
	level = 3,
	layout = "normal",
	className,
}: ArticleCardProps) {
	const { groupProps, linkProps } = useClickableGroup();

	const isFeatured = layout === "featured";

	let kicker: ReactNode;
	if (isFeatured) {
		kicker = (
			<Kicker className={styles.kicker} size="lg">
				Featured
			</Kicker>
		);
	} else {
		kicker = (
			<Kicker className={styles.kicker}>
				{story.section?.name ?? "Uncategorized"}
			</Kicker>
		);
	}

	return (
		<article
			{...groupProps}
			className={classNames(styles.card, groupProps.className, className)}
			data-layout={layout}
		>
			<div className={styles.body}>
				<Headline
					level={level}
					className={styles.headline}
					accent={isFeatured}
					size={isFeatured ? "lg" : "md"}
				>
					<Link href={`/stories/${story.slug}`}>
						<a
							{...linkProps}
							className={classNames(styles.link, linkProps.className)}
						>
							{story.title}
						</a>
					</Link>
				</Headline>
				{kicker}
				{story.blurb && !isFeatured && (
					<Blurb className={styles.blurb}>
						<RichText render={story.blurb} />
					</Blurb>
				)}
				{isFeatured && (
					<Byline className={styles.byline} people={story.authors} size="lg" />
				)}
			</div>
			<Image
				{...(story.thumbnail ?? PLACEHOLDER_THUMBNAIL)}
				alt=""
				credit={null}
				className={styles.thumbnail}
			/>
		</article>
	);
}
