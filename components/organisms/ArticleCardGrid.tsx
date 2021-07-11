import classNames from "classnames";
import { Story } from "../../prismic/types/story";
import ArticleCard from "../molecules/ArticleCard";
import styles from "./ArticleCardGrid.module.css";

export interface ArticleCardGridProps {
	stories: Story[];
	className?: string;
}

export default function ArticleCardGrid({
	stories,
	className,
}: ArticleCardGridProps) {
	return (
		<ul className={classNames(styles.grid, className)}>
			{stories.map((story) => (
				<li className={styles.item} key={story.slug}>
					<ArticleCard story={story} className={styles.card} />
				</li>
			))}
		</ul>
	);
}
