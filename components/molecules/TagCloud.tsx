import classNames from "classnames";
import { Routes } from "../../prismic/routes";
import { Tag } from "../../prismic/types/tag";
import Button from "../atoms/Button";
import TagIcon from "../atoms/icons/Tag";
import styles from "./TagCloud.module.css";

export interface TagCloudProps {
	tags: Tag[];
	className?: string;
	label?: string;
}

export default function TagCloud({
	tags,
	className,
	label = "Tags",
}: TagCloudProps) {
	return (
		<ul className={classNames(styles.cloud, className)} aria-label={label}>
			{tags.map(({ name, slug }) => (
				<li key={slug}>
					<Button href={Routes.tag({ slug })}>
						<Button.Icon icon={TagIcon} title="More stories tagged" /> {name}
					</Button>
				</li>
			))}
		</ul>
	);
}
