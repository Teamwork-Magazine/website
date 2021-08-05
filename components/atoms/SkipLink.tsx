import classNames from "classnames";
import { MouseEvent } from "react";
import styles from "./SkipLink.module.css";

export default function SkipLink() {
	return (
		<a
			className={classNames(styles.skipLink, "u-visually-hidden-focusable")}
			href="#skip-link-target"
			onClick={skipToMain}
		>
			Skip to Main Content
		</a>
	);
}

function skipToMain(e: MouseEvent<HTMLAnchorElement>) {
	e.preventDefault();

	const h1 = document.querySelector("h1");
	if (!h1) return;

	h1.tabIndex = -1;
	h1.focus();

	h1.addEventListener(
		"blur",
		() => {
			h1.removeAttribute("tabIndex");
		},
		{ once: true }
	);
}
