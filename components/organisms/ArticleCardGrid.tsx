import classNames from "classnames";
import ArticleCard, { ArticleCardProps } from "../molecules/ArticleCard";
import styles from "./ArticleCardGrid.module.css";

export interface ArticleCardGridProps {
	stories: ArticleCardProps[];
	className?: string;
}

export default function ArticleCardGrid({
	stories,
	className,
}: ArticleCardGridProps) {
	return (
		<ul className={classNames(styles.grid, className)}>
			{stories.map((story) => (
				<li className={styles.item} key={story.uid}>
					<ArticleCard {...story} className="c-article-card-grid__card" />
				</li>
			))}
		</ul>
	);
}
