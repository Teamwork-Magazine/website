import { GetStaticProps } from "next";
import { createClient } from "prismic/client";
import * as Articles from "prismic/queries/articles";
import { Article } from "prismic/types/article";

import React from "react";

interface MagazineProps {
	articles: Article[];
	preview: boolean;
}

export default function MagazinePage({ articles }: MagazineProps) {
	return (
		<ul>
			{articles.map((article) => (
				<li key={article.id}>{article.title}</li>
			))}
		</ul>
	);
}

export const getStaticProps: GetStaticProps<MagazineProps> = async ({
	preview = false,
	previewData = {},
}) => {
	// @ts-ignore
	const { ref } = previewData;
	const client = createClient();
	const articles = await Articles.all(client, ref ? { ref } : {});

	return {
		props: {
			preview,
			articles,
		},
	};
};
