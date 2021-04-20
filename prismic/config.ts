import { Document } from "@prismicio/client/types/documents"

export const apiEndpoint = 'https://teamwork-magazine.cdn.prismic.io/api/v2'

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN

export const linkResolver = (doc: Document) => {
	if (doc.type === 'author') {
		return `/authors/${doc.uid}`
	}

	return '/'
}

export const hrefResolver = (doc: Document) => {
	if (doc.type === 'author') {
		return '/authors/[uid]'
	}

	return '/'
}
