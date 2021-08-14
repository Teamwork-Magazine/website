import classNames from "classnames";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { HeadingLevel } from "../atoms/Heading";
import Headline from "../atoms/Headline";
import Blurb from "../atoms/Blurb";
import Image from "./Image";
import { Story } from "../../prismic/types/story";
import { Image as ImageData } from "../../prismic/types/image";
import Byline from "../atoms/Byline";
import Kicker from "../atoms/Kicker";
import placeholder from "../../public/thumbnail-placeholder.png";
import styles from "./ArticleCard.module.css";

const PLACEHOLDER_THUMBNAIL: ImageData = {
	...placeholder,
	alt: "",
	credit: null,
};

export type ArticleCardKickerPreference = "category" | "tag";

type ArticleCardLayout = "normal" | "featured";

export interface ArticleCardProps {
	story: Story;
	className?: string;
	level?: HeadingLevel;
	kickerPrefer?: ArticleCardKickerPreference;
	layout?: ArticleCardLayout;
}

export default function ArticleCard({
	story,
	level = 3,
	layout = "normal",
	kickerPrefer = "category",
	className,
}: ArticleCardProps) {
	const isFeatured = layout === "featured";
	const url = `/stories/${story.slug}`;

	let kicker = "Uncategorized";
	if (isFeatured && story.featured) {
		kicker = "Featured";
	} else if ((kickerPrefer === "tag" || !story.section) && story.tags.length) {
		kicker = story.tags[0].name;
	} else if (story.section) {
		kicker = story.section.name;
	}

	return (
		<article
			className={classNames(styles.card, className)}
			data-layout={layout}
		>
			<div className={styles.body}>
				<Headline
					level={level}
					className={styles.headline}
					accent={isFeatured}
					size={isFeatured ? "lg" : "md"}
				>
					<Link href={url}>
						<a className={styles.link}>{story.title}</a>
					</Link>
				</Headline>
				<Kicker className={styles.kicker} size={isFeatured ? "lg" : "md"}>
					{kicker}
				</Kicker>
				{story.blurb && !isFeatured && (
					<Blurb className={styles.blurb}>
						<RichText render={story.blurb} />
					</Blurb>
				)}
				{isFeatured && (
					<Byline className={styles.byline} people={story.authors} size="lg" />
				)}
			</div>
			<Link href={url}>
				<a className={styles.thumbnail} tabIndex={-1} aria-hidden="true">
					<Image
						{...(story.thumbnail ?? PLACEHOLDER_THUMBNAIL)}
						alt=""
						credit={null}
						className={styles.image}
					/>
				</a>
			</Link>
		</article>
	);
}
