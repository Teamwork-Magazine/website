interface Routeable {
	slug: string;
}

type Router = (entity: Routeable) => string;

const article: Router = ({ slug }) => `/articles/${slug}`;
const author: Router = ({ slug }) => `/authors/${slug}`;
const category: Router = ({ slug }) => `/category/${slug}`;

export const Routes = {
	article,
	author,
	category,
};
