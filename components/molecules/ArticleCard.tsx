import classNames from "classnames";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import Heading, { HeadingLevel } from "../atoms/Heading";
import { ArticleProps } from "../templates/Article";
import Image from "./Image";
import useClickableGroup from "../../lib/hooks/useClickableGroup";
import "./ArticleCard.css";

export type ArticleCardProps = Pick<
	ArticleProps,
	"uid" | "title" | "featuredImage" | "section" | "blurb" | "featured"
> & {
	className?: string;
	level?: HeadingLevel;
};

export default function ArticleCard({
	uid,
	title,
	featuredImage,
	section,
	blurb,
	featured,
	level = 3,
	className,
}: ArticleCardProps) {
	const { groupProps, linkProps } = useClickableGroup();

	return (
		<article
			{...groupProps}
			className={classNames("c-article-card", groupProps.className, className)}
		>
			<div className="c-article-card__body">
				<Heading level={level} className="c-article-card__headline">
					<Link href={`/stories/${uid}`}>
						<a
							{...linkProps}
							className={classNames(
								"c-article-card__link",
								linkProps.className
							)}
						>
							{title}
						</a>
					</Link>
				</Heading>
				<p className="c-article-card__kicker">
					{section ? section.name : "Uncategorized"}
				</p>
				{blurb && !featured && (
					<div className="c-article-card__blurb">
						<RichText render={blurb} />
					</div>
				)}
			</div>
			{featuredImage && (
				<Image {...featuredImage} className="c-article-card__thumbnail" />
			)}
		</article>
	);
}
