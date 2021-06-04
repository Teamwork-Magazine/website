import React from "react";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { Article } from "prismic/types/article";
import { createClient } from "prismic/client";
import * as Articles from "prismic/queries/articles";
import { hasRef } from "prismic/preview";
import Link from "next/link";
import { Routes } from "prismic/routes";

interface ArticleProps {
	preview: boolean;
	article: Article;
}

export default function ArticlePage({ article }: ArticleProps) {
	return (
		<article>
			{article.category && (
				<Link href={Routes.category(article.category)}>
					{article.category.name}
				</Link>
			)}
			<h1>{article.title}</h1>
		</article>
	);
}

interface ArticleUrlParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps<ArticleProps, ArticleUrlParams> =
	async ({ params, preview = false, previewData = {} }) => {
		const client = createClient();
		const article = await Articles.find(
			client,
			params.slug,
			hasRef(previewData) ? { ref: previewData.ref } : {}
		);

		if (article === null) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				preview,
				article,
			},
		};
	};

export const getStaticPaths: GetStaticPaths<ArticleUrlParams> = async () => {
	const client = createClient();
	const articles = await Articles.all(client);

	return {
		paths: articles.map((article) => `/articles/${article.slug}`),
		fallback: true,
	};
};
