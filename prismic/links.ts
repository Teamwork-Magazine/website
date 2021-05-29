interface Linkable {
	slug: string;
}

type Linker = (entity: Linkable) => string;

export const article: Linker = ({ slug }) => `/articles/${slug}`;
export const author: Linker = ({ slug }) => `/authors/${slug}`;
export const category: Linker = ({ slug }) => `/category/${slug}`;
