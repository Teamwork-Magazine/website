import { Routes } from "../../prismic/routes";
import { Story } from "../../prismic/types/story";
import Kicker, { KickerProps } from "../atoms/Kicker";

interface KickerSource {
	valid(story: Story): boolean;
	toProps(story: Story): Pick<KickerProps, "children" | "href">;
}

const fallback: KickerSource = {
	valid() {
		return true;
	},
	toProps() {
		return {
			href: Routes.uncategorizedStories,
			children: "Uncategorized",
		};
	},
};

const category: KickerSource = {
	valid(story) {
		return story.section !== null;
	},
	toProps(story) {
		const { name, slug } = story.section!;

		return {
			href: Routes.category({ slug }),
			children: name,
		};
	},
};

const tag: KickerSource = {
	valid(story) {
		return story.tags.length > 0;
	},
	toProps(story) {
		const { name, slug } = story.tags[0];

		return {
			href: Routes.tag({ slug }),
			children: name,
		};
	},
};

const featured: KickerSource = {
	valid(story) {
		return story.featured;
	},
	toProps() {
		return {
			href: Routes.featuredStories,
			children: "Featured",
		};
	},
};

const sources = {
	fallback,
	category,
	tag,
	featured,
} as const;

export type KickerPreference = keyof typeof sources;

export type ArticleKickerProps = Pick<KickerProps, "className" | "size"> & {
	story: Story;
	prefer?: KickerPreference | KickerPreference[];
};

export default function ArticleKicker({
	story,
	prefer = ["category", "tag"],
	...props
}: ArticleKickerProps) {
	const availableSources = (Array.isArray(prefer) ? prefer : [prefer]).map(
		(preference) => sources[preference]
	);
	const chosenSource =
		availableSources.find((source) => source.valid(story)) ?? sources.fallback;

	const kickerProps = {
		...props,
		...chosenSource.toProps(story),
	};

	return <Kicker {...kickerProps} />;
}
