import classNames from "classnames";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { ReactNode } from "react";
import { IconBaseProps, IconType } from "react-icons";
import styles from "./Button.module.css";

export type ButtonTheme = "subtle";
export type ButtonSize = "md";

export type ButtonProps = LinkButtonProps | TrueButtonProps;

export default function Button(props: ButtonProps) {
	return isLink(props) ? <LinkButton {...props} /> : <TrueButton {...props} />;
}

interface ButtonIconProps extends IconBaseProps {
	icon: IconType;
}

Button.Icon = function ButtonIcon({
	icon: Icon,
	className,
	...props
}: ButtonIconProps) {
	return <Icon className={classNames(styles.icon, className)} {...props} />;
};

interface SharedButtonProps<T = Element> {
	className?: string;
	theme?: ButtonTheme;
	size?: ButtonSize;
	onClick?: MouseEventHandler<T>;
	children?: ReactNode;
}

export interface LinkButtonProps extends SharedButtonProps<HTMLAnchorElement> {
	href: string;
	external?: boolean;
}

function LinkButton({ href, external = false, ...props }: LinkButtonProps) {
	if (external) {
		return (
			<a
				{...handleSharedProps(props)}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
			/>
		);
	}

	return (
		<Link href={href}>
			<a {...handleSharedProps(props)} />
		</Link>
	);
}

export interface TrueButtonProps extends SharedButtonProps<HTMLButtonElement> {
	type?: JSX.IntrinsicElements["button"]["type"];
}

function TrueButton({ type = "button", ...props }: TrueButtonProps) {
	return <button type={type} {...handleSharedProps(props)} />;
}

function handleSharedProps<T>({
	className,
	children,
	onClick,
	size = "md",
	theme = "subtle",
	...props
}: SharedButtonProps<T>) {
	return {
		...props,
		className: classNames(styles.button, "u-text-accent", className),
		"data-size": size,
		"data-theme": theme,
		onClick,
		children,
	};
}

function isLink(props: ButtonProps): props is LinkButtonProps {
	return typeof (props as LinkButtonProps).href === "string";
}
