interface Routeable {
	slug: string;
}

type Router = (entity: Routeable) => string;

const story: Router = ({ slug }) => `/stories/${slug}`;
const person: Router = ({ slug }) => `/people/${slug}`;
const section: Router = ({ slug }) => `/sections/${slug}`;

export const Routes = {
	story,
	person,
	section,
};
