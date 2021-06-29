import BaseLayout from "components/layouts/BaseLayout";
import LeadStory from "components/molecules/LeadStory";
import StorySummary from "components/molecules/StorySummary";
import LeadSection from "components/molecules/LeadSection";
import { GetStaticProps } from "next";
import { Elements, RichTextBlock } from "prismic-reactjs";
import Container from "components/atoms/Container";

interface Tag {
	uid: string;
	name: string;
}

interface Media {
	src: string;
	alt: string | null;
	credit: string | null;
	height: number;
	width: number;
}

interface Person {
	kind: "person";
	uid: string;
	name: string;
}

interface Story {
	kind: "longform" | "photo-essay" | "profile";
	uid: string;
	title: string;
	blurb: RichTextBlock[] | null;
	authors: Person[];
	thumbnail: Media;
	tags: Tag[];
}

export interface HomePageProps {
	lead: Story;
	latest: Story[];
}

export default function HomePage({ lead, latest }: HomePageProps) {
	return (
		<BaseLayout>
			<main>
				<h1 className="sr-only">Teamwork Magazine</h1>
				<LeadSection className="pb-8 md:pb-16">
					<LeadStory story={lead} />
				</LeadSection>
				<Container className="pb-8 md:pb-16">
					<section>
						<ul className="grid grid-cols-12 gap-8 lg:gap-16">
							{latest.map((story) => (
								<li
									key={story.uid}
									className="col-span-full sm:col-span-6 lg:col-span-4"
								>
									<StorySummary story={story} />
								</li>
							))}
						</ul>
					</section>
				</Container>
				<section className="py-8 md:py-16 bg-red-600 text-white">
					<Container className="grid grid-flow-row-dense gap-y-2">
						<h2 className="font-bold text-2xl md:text-3xl">
							About Teamwork Magazine
						</h2>
						<div className="prose text-white">
							<p>
								This is a bit about <em>Teamwork Magazine</em>. We cover sports,
								and everything that entails. Lorem ipsum dolor sit, amet
								consectetur adipisicing elit. Nostrum assumenda a error
								provident? Et quaerat reiciendis eos velit tempore corrupti
								consequatur? Amet ullam culpa praesentium dicta quaerat
								reprehenderit neque eum.
							</p>
						</div>
					</Container>
				</section>
			</main>
		</BaseLayout>
	);
}

const story: Story = {
	kind: "longform",
	uid: "the-way-of-the-weary",
	title: "The Way of the Weary",
	thumbnail: {
		src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920",
		alt: "Soccer field",
		credit: null,
		height: 1280,
		width: 1920,
	},
	blurb: [
		{
			type: Elements.paragraph,
			text: "Soccer’s biggest stars have been playing almost nonstop for a year. Over the next month, major tournaments like Euro 2020 may be decided by which ones have the most left in the tank.",
			spans: [],
		},
	],
	authors: [{ kind: "person", uid: "tommy-johnson", name: "Tommy Johnson" }],
	tags: [{ uid: "soccer", name: "Soccer" }],
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	return {
		props: {
			lead: story,
			latest: new Array<Story>(9).fill(story),
		},
	};
};
