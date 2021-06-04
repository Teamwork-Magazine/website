import ArticleSummary from "components/molecules/ArticleSummary";
import { Article } from "prismic/types/article";

export interface ArticleGridProps {
	articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
	return (
		<ul>
			{articles.map((article) => (
				<li key={article.slug}>
					<ArticleSummary article={article} />
				</li>
			))}
		</ul>
	);
}
