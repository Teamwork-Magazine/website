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
					accent={layout === "featured"}
					size={layout === "featured" ? "lg" : "md"}
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
				<p className={styles.kicker}>
					{story.section ? story.section.name : "Uncategorized"}
				</p>
				{story.blurb && layout !== "featured" && (
					<Blurb>
						<RichText render={story.blurb} />
					</Blurb>
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
