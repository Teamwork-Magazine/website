import classNames from "classnames";
import ArticleCard, {
	ArticleCardProps,
	ArticleCardVariant,
} from "../molecules/ArticleCard";
import "./ArticleCardGrid.css";

export type ArticleCardGridVariant = ArticleCardVariant;

export interface ArticleCardGridProps {
	stories: ArticleCardProps[];
	variant?: ArticleCardGridVariant;
	className?: string;
}

export default function ArticleCardGrid({
	stories,
	variant = "standard",
	className,
}: ArticleCardGridProps) {
	return (
		<ul
			className={classNames("c-article-card-grid", className)}
			data-variant={variant}
		>
			{stories.map((story) => (
				<li className="c-article-card-grid__item" key={story.uid}>
					<ArticleCard
						{...story}
						className="c-article-card-grid__card"
						variant={variant}
					/>
				</li>
			))}
		</ul>
	);
}
