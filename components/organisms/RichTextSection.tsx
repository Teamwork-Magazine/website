import classNames from "classnames";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic/config";
import { RichTextSlice } from "../../prismic/types/slices/rich-text";
import Stack from "../atoms/Stack";
import styles from "./RichTextSection.module.css";

export interface RichTextSectionProps {
	slice: RichTextSlice;
	className?: string;
}

export default function RichTextSection({
	slice,
	className,
}: RichTextSectionProps) {
	return (
		<Stack
			className={classNames(styles.blocks, className)}
			gap="var(--space-s)"
		>
			<RichText render={slice.blocks} linkResolver={linkResolver} />
		</Stack>
	);
}
