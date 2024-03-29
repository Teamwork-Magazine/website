import { ReactNode } from "react";
import { Story } from "../../prismic/types/story";
import Heading from "../atoms/Heading";
import Stack from "../atoms/Stack";
import Breadcrumb, { BreadcrumbLinkProps } from "../molecules/Breadcrumb";
import Section from "../molecules/Section";
import ArticleCard, {
	ArticleCardKickerPreference,
} from "../molecules/ArticleCard";
import ArticleCardGrid from "../organisms/ArticleCardGrid";
import classNames from "classnames";
import styles from "./ArticleIndex.module.css";

export interface ArticleIndexProps {
	heading: ReactNode;
	breadcrumb?: BreadcrumbLinkProps[];
	leadStory: Story | null;
	otherStories: Story[];
	kickerPrefer?: ArticleCardKickerPreference;
}

export default function ArticleIndex({
	heading,
	breadcrumb,
	leadStory,
	otherStories,
	kickerPrefer,
}: ArticleIndexProps) {
	return (
		<>
			<header className={classNames(styles.header, "u-layout-grid")}>
				<div className="u-layout-wide">
					{breadcrumb && (
						<Breadcrumb className={styles.breadcrumb}>
							{breadcrumb.map((props) => (
								<Breadcrumb.Link key={props.href} {...props} />
							))}
						</Breadcrumb>
					)}
					<Heading level={1} className={styles.heading}>
						{heading}
					</Heading>
					<div className={styles.accent} aria-hidden="true" />
				</div>
			</header>
			<main>
				{leadStory && (
					<Section lead>
						<h2 className="u-visually-hidden">Lead Story</h2>
						<ArticleCard
							story={leadStory}
							level={3}
							layout="featured"
							kickerPrefer={
								kickerPrefer
									? (["featured"].concat(
											kickerPrefer
									  ) as ArticleCardKickerPreference)
									: ["featured", "category", "tag"]
							}
						/>
					</Section>
				)}
				{otherStories.length > 0 ? (
					<Section>
						<h2 className="u-visually-hidden">More Stories</h2>
						<Stack gap="var(--space-l-xl)" className="u-layout-wide">
							<ArticleCardGrid
								stories={otherStories}
								kickerPrefer={kickerPrefer}
							/>
						</Stack>
					</Section>
				) : null}
			</main>
		</>
	);
}
