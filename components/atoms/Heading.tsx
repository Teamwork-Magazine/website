import { HTMLAttributes } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
	level: HeadingLevel;
};

export default function Heading({ level, ...props }: HeadingProps) {
	const HeadingTag = `h${level}` as const;
	return <HeadingTag {...props} />;
}
