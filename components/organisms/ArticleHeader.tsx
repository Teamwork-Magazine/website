import classNames from "classnames";
import { RichText } from "prismic-reactjs";
import { Routes } from "../../prismic/routes";
import { Site } from "../../prismic/types/site";
import { Story } from "../../prismic/types/story";
import Blurb from "../atoms/Blurb";
import Button from "../atoms/Button";
import Byline from "../atoms/Byline";
import Headline from "../atoms/Headline";
import FacebookIcon from "../atoms/icons/Facebook";
import MailIcon from "../atoms/icons/MailIcon";
import TwitterIcon from "../atoms/icons/Twitter";
import Stack from "../atoms/Stack";
import ArticleKicker from "../molecules/ArticleKicker";
import Image from "../molecules/Image";
import styles from "./ArticleHeader.module.css";

type ArticleHeaderLayout = "no-image" | "landscape-image" | "portrait-image";

function getLayout(story: Story): ArticleHeaderLayout {
	if (!story.coverImage) {
		return "no-image";
	}

	const { height, width } = story.coverImage;
	const aspectRatio = width / height;

	return aspectRatio > 1 ? "landscape-image" : "portrait-image";
}

export interface ArticleHeaderProps {
	site: Site;
	story: Story;
	className?: string;
}

export default function ArticleHeader({
	site,
	story,
	className,
}: ArticleHeaderProps) {
	const layout = getLayout(story);
	const url = site.url + Routes.story(story);

	return (
		<header
			className={classNames(styles.header, "u-layout-grid", className)}
			data-layout={layout}
		>
			<Stack gap="var(--space-s)" className={styles.summary}>
				<ArticleKicker
					className={styles.kicker}
					story={story}
					size="lg"
					prefer={["category", "tag"]}
				/>
				<Headline className={styles.headline} size="xl" accent>
					{story.title}
				</Headline>
				{story.blurb && (
					<Blurb className={styles.blurb} size="lg">
						<RichText render={story.blurb} />
					</Blurb>
				)}
				<div className={styles.secondary}>
					<Stack className={styles.bylines} gap="var(--space-2xs)">
						<Byline people={story.authors} />
						{story.photographers && (
							<Byline people={story.photographers} prefix="Photos" />
						)}
					</Stack>
					<div className={styles.share}>
						<Button
							href={`https://facebook.com/sharer.php?u=${encodeURIComponent(
								url
							)}`}
							external
							className={styles.shareButton}
							data-brand="facebook"
						>
							<Button.Icon
								className={styles.shareIcon}
								icon={FacebookIcon}
								title="Share on Facebook"
							/>
						</Button>
						<Button
							href={`https://twitter.com/share?u=${encodeURIComponent(url)}`}
							external
							className={styles.shareButton}
							data-brand="twitter"
						>
							<Button.Icon
								className={styles.shareIcon}
								icon={TwitterIcon}
								title="Share on Twitter"
							/>
						</Button>
						<Button
							href={`mailto:?subject=${encodeURIComponent(
								`${story.title} - ${site.title}`
							)}&body=${encodeURIComponent(url)}`}
							external
							className={styles.shareButton}
							data-brand="email"
						>
							<Button.Icon
								className={styles.shareIcon}
								icon={MailIcon}
								title="Share via email"
							/>
						</Button>
					</div>
				</div>
			</Stack>
			{story.coverImage && (
				// eslint-disable-next-line jsx-a11y/alt-text
				<Image
					{...story.coverImage}
					className={classNames(styles.image, {
						"u-layout-wide": layout === "landscape-image",
					})}
				/>
			)}
		</header>
	);
}
