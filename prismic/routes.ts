interface Routeable {
	slug: string;
}

// Stories and story indexes
const allStories = "/stories";
const featuredStories = "/stories/featured";
const uncategorizedStories = "/stories/section/uncategorized";
const story = ({ slug }: Routeable) => `/stories/${slug}`;
const category = ({ slug }: Routeable) => `/stories/section/${slug}`;
const tag = ({ slug }: Routeable) => `/stories/tag/${slug}`;

// Specialty pages
const privacy = "/privacy";
const issues = "/issues";
const stockists = "/stockists";

// Generic pages
const page = ({ slug }: Routeable) => `/${slug}`;

// Catch-all route
const catchAll = page;

export const Routes = {
	allStories,
	featuredStories,
	uncategorizedStories,
	story,
	category,
	tag,
	privacy,
	issues,
	stockists,
	page,
	catchAll,
};
