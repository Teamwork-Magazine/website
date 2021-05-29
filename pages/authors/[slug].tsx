import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "prismic/client";
import { hasRef } from "prismic/preview";
import * as Authors from "prismic/queries/authors";
import { Author } from "prismic/types/author";
import { ParsedUrlQuery } from "querystring";

interface AuthorProps {
	preview: boolean;
	author: Author;
}

export default function AuthorPage({ author }: AuthorProps) {
	return <h1>{author.name}</h1>;
}

interface AuthorUrlParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps<AuthorProps, AuthorUrlParams> =
	async ({ params, preview = false, previewData = {} }) => {
		const client = createClient();
		const author = await Authors.find(
			client,
			params.slug,
			hasRef(previewData) ? { ref: previewData.ref } : {}
		);

		if (author === null) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				preview,
				author,
			},
		};
	};

export const getStaticPaths: GetStaticPaths<AuthorUrlParams> = async () => {
	const client = createClient();
	const authors = await Authors.all(client);

	return {
		paths: authors.map((author) => `/authors/${author.slug}`),
		fallback: true,
	};
};
