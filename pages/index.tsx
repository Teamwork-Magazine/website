import Container from "components/atoms/Container";
import BaseLayout from "components/layouts/BaseLayout";
import LeadStory from "components/molecules/LeadStory";
import LeadSection from "components/molecules/LeadSection";
import { GetStaticProps } from "next";
import { Elements, RichTextBlock } from "prismic-reactjs";

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
}

export default function HomePage({ lead }: HomePageProps) {
	return (
		<BaseLayout>
			<main>
				<h1 className="sr-only">Teamwork Magazine</h1>
				<LeadSection className="pb-8 md:pb-16">
					<LeadStory story={lead} />
				</LeadSection>
			</main>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	return {
		props: {
			lead: {
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
					},
				],
				authors: [
					{ kind: "person", uid: "tommy-johnson", name: "Tommy Johnson" },
				],
				tags: [{ uid: "soccer", name: "Soccer" }],
			},
		},
	};
};
