import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import { createClient } from "prismic/client";
import * as Authors from "prismic/queries/authors";
import { Author } from "prismic/types/author";
import { ParsedUrlQuery } from "querystring";

interface AuthorProps {
	preview: boolean;
	author: Author | null;
}

export default function AuthorPage({ author }: AuthorProps) {
	if (!author) {
		return <ErrorPage statusCode={404} />;
	}

	return <h1>{author.name}</h1>;
}

interface AuthorUrlParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps<AuthorProps, AuthorUrlParams> =
	async ({ params, preview = false, previewData = {} }) => {
		// @ts-ignore
		const { ref } = previewData;
		const client = createClient();
		const author = await Authors.find(client, params.slug, ref ? { ref } : {});

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
