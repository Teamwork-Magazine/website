import Image from "next/image";
import Link from "next/link";
import { RichTextBlock } from "prismic-reactjs";
import Kicker from "../atoms/Kicker";
import Headline from "../atoms/Headline";
import Byline from "../atoms/Byline";

//! TODO: Extract these elsewhere
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

export interface LeadStoryProps {
	story: Story;
}

export default function LeadStory({ story }: LeadStoryProps) {
	const { kind, uid, title, authors, thumbnail } = story;

	return (
		<article className="text-center md:grid md:grid-cols-2 md:grid-flow-col-dense md:items-center md:gap-x-8 lg:gap-x-16">
			<div className="mb-8 md:mb-0">
				<Image
					layout="responsive"
					src={thumbnail.src}
					height={thumbnail.height}
					width={thumbnail.width}
					alt=""
				/>
			</div>
			<div>
				<Kicker size="lg" href="/stories/featured">
					Featured
				</Kicker>
				<Headline className="mt-2 lg:mt-4" accent level={2} size="lg">
					<Link href={`/stories/${kind}/${uid}`}>
						<a>{title}</a>
					</Link>
				</Headline>
				<Byline className="mt-2 lg:mt-4" size="lg" people={authors} />
			</div>
		</article>
	);
}
