import React from "react";
import classNames from "classnames";
import Link from "next/link";
import Logo from "../atoms/Logo";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={classNames(styles.header, "u-layout-grid")}>
			<div className="u-layout-wide">
				<Link href="/">
					<a className="leading-none">
						<Logo />
					</a>
				</Link>
			</div>
		</header>
	);
}
