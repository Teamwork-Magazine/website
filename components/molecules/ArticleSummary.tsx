import Thumbnail from "components/atoms/Thumbnail";
import { RichText } from "prismic-reactjs";
import { Article } from "prismic/types/article";

export interface ArticleSummaryProps {
	article: Article;
}

export default function ArticleSummary({ article }: ArticleSummaryProps) {
	const { title, blurb, thumbnail } = article;

	return (
		<article>
			{thumbnail && <Thumbnail {...thumbnail} />}
			<h3>{title}</h3>
			{blurb && RichText.render(blurb)}
		</article>
	);
}
