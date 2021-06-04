import classNames from "classnames";
import { GetStaticProps } from "next";
import { createClient } from "prismic/client";
import { hasRef } from "prismic/preview";
import * as Articles from "prismic/queries/articles";
import { Article } from "prismic/types/article";
import BaseLayout from "components/layouts/BaseLayout";
import Link from "next/link";
import { Routes } from "prismic/routes";
import { RichText } from "prismic-reactjs";

interface ArticlesPageProps {
	articles: Article[];
	preview: boolean;
}

export default function ArticlesPage({ articles }: ArticlesPageProps) {
	return (
		<BaseLayout>
			<main>
				<header className="px-8 pt-24 pb-4">
					<div className="max-w-7xl mx-auto">
						<h1 className="text-3xl font-light">The Latest</h1>
					</div>
				</header>
				<section className="px-8 py-4">
					<ul className="max-w-7xl mx-auto grid gap-8">
						{articles.map((article, i) => (
							<li key={article.id}>
								<article>
									{article.category && (
										<div className="mb-2">
											<Link href={Routes.category(article.category)}>
												<a className="font-bold font-accent text-blue-600 uppercase tracking-wider">
													{article.category.name}
												</a>
											</Link>
										</div>
									)}
									<h2
										className={classNames(
											"font-medium",
											i === 0 ? ["text-3xl"] : ["text-xl"]
										)}
									>
										{article.title}
									</h2>
									{article.blurb && (
										<div className="prose mt-2 leading-normal">
											{RichText.render(article.blurb)}
										</div>
									)}
								</article>
							</li>
						))}
					</ul>
				</section>
			</main>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async ({
	preview = false,
	previewData = {},
}) => {
	const client = createClient();
	const articles = await Articles.all(
		client,
		hasRef(previewData) ? { ref: previewData.ref } : {}
	);

	return {
		props: {
			preview,
			articles,
		},
	};
};
