import ArticleSummary from "components/molecules/ArticleSummary";
import { Article } from "prismic/types/article";
import styles from "./ArticleGrid.module.css";

export interface ArticleGridProps {
	articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
	return (
		<ul className={styles.grid} role="list">
			{articles.map((article) => (
				<li key={article.slug} className={styles.item}>
					<ArticleSummary article={article} />
				</li>
			))}
		</ul>
	);
}
