import React from "react";
import { Article } from "prismic/types/article";
import { GetStaticPaths, GetStaticProps } from "next";
import type { CategoryUrlParams } from ".";
import { createClient } from "prismic/client";
import * as Articles from "prismic/queries/articles";

interface ArticleProps {
	preview: boolean;
	article: Article | null;
}

export default function ArticlePage({ article }: ArticleProps) {
	if (!article) {
		return null;
	}

	return <h1>{article.title}</h1>;
}

interface ArticleUrlParams extends CategoryUrlParams {
	slug: string;
}

export const getStaticProps: GetStaticProps<ArticleProps, ArticleUrlParams> =
	async ({ params, preview = false, previewData = {} }) => {
		// @ts-ignore
		const { ref } = previewData;
		const client = createClient();
		const article = await Articles.find(
			client,
			params.slug,
			ref ? { ref } : {}
		);

		if (article === null) {
			return {
				notFound: true,
			};
		}

		if (article.category.slug !== params.category) {
			return {
				redirect: {
					destination: `/magazine/${article.category.slug}/${article.slug}`,
					statusCode: 301,
				},
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
		paths: articles.map(
			(article) => `/magazine/${article.category.slug}/${article.slug}`
		),
		fallback: true,
	};
};
