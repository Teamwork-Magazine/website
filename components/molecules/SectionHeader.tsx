import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading";
import ArrowRightIcon from "../atoms/icons/ArrowRight";
import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps {
	className?: string;
	children?: ReactNode;
}

export default function SectionHeader({
	className,
	children,
}: SectionHeaderProps) {
	return <div className={classNames(styles.header, className)}>{children}</div>;
}

export interface SectionHeaderHeadingProps {
	className?: string;
	children?: ReactNode;
}

SectionHeader.Heading = function SectionHeaderHeading({
	className,
	children,
}: SectionHeaderHeadingProps) {
	return (
		<Heading level={2} className={classNames(styles.heading, className)}>
			{children}
		</Heading>
	);
};

export interface SectionHeaderLinkProps {
	href: string;
	className?: string;
	children?: ReactNode;
}

SectionHeader.Link = function SectionHeaderLink({
	href,
	className,
	children,
}: SectionHeaderLinkProps) {
	return (
		<Button href={href} className={classNames(styles.link, className)}>
			{children} <Button.Icon icon={ArrowRightIcon} />
		</Button>
	);
};
