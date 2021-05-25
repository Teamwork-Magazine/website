import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import { createClient } from "prismic/client";
import * as Categories from "prismic/queries/categories";
import { Category } from "prismic/types/category";
import { ParsedUrlQuery } from "querystring";

interface CategoryProps {
	preview: boolean;
	category: Category | null;
}

export default function CategoryPage({ category }: CategoryProps) {
	if (!category) {
		return <ErrorPage statusCode={404} />;
	}

	return <h1>{category.name}</h1>;
}

export interface CategoryUrlParams extends ParsedUrlQuery {
	category: string;
}

export const getStaticProps: GetStaticProps<CategoryProps, CategoryUrlParams> =
	async ({ params, preview = false, previewData = {} }) => {
		// @ts-ignore
		const { ref } = previewData;
		const client = createClient();
		const category = await Categories.find(
			client,
			params.category,
			ref ? { ref } : {}
		);

		return {
			props: {
				preview,
				category,
			},
		};
	};

export const getStaticPaths: GetStaticPaths<CategoryUrlParams> = async () => {
	const client = createClient();
	const categories = await Categories.all(client);

	return {
		paths: categories.map((category) => `/magazine/${category.slug}`),
		fallback: true,
	};
};
