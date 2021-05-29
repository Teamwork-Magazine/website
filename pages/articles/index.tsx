import React from "react";
import { GetStaticProps } from "next";
import { createClient } from "prismic/client";
import { hasRef } from "prismic/preview";
import * as Articles from "prismic/queries/articles";
import { Article } from "prismic/types/article";
import BaseLayout from "components/layouts/BaseLayout";
import ArticleGrid from "components/organisms/ArticleGrid";

interface ArticlesPageProps {
	articles: Article[];
	preview: boolean;
}

export default function ArticlesPage({ articles }: ArticlesPageProps) {
	return (
		<BaseLayout>
			<ArticleGrid articles={articles} />
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
