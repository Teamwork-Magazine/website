import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { RichText, RichTextBlock } from "prismic-reactjs";
import Kicker from "../atoms/Kicker";
import Headline from "../atoms/Headline";

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

export interface StorySummaryProps {
	story: Story;
}

export default function StorySummary({ story }: StorySummaryProps) {
	const { kind, uid, title, thumbnail, blurb, tags } = story;
	const tag = tags[0];

	return (
		<article>
			<div className="mb-4">
				<Image
					layout="responsive"
					src={thumbnail.src}
					height={thumbnail.height}
					width={thumbnail.width}
					alt=""
				/>
			</div>
			<header className="mb-1">
				<Kicker href={tag ? `/tags/${tag.uid}` : `/stories/${kind}`}>
					{tag ? tag.name : kind}
				</Kicker>
				<Headline level={2}>
					<Link href={`/stories/${kind}/${uid}`}>
						<a>{title}</a>
					</Link>
				</Headline>
			</header>
			{blurb && (
				<div className={classNames("prose", "leading-snug", "text-gray-500")}>
					<RichText render={blurb} />
				</div>
			)}
		</article>
	);
}
