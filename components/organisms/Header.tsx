import React from "react";
import Link from "next/link";
import Logo from "components/atoms/Logo";

export default function Header() {
	return (
		<header className="py-4 px-8">
			<div className="flex max-w-7xl mx-auto">
				<Link href="/">
					<a className="leading-none">
						<Logo />
					</a>
				</Link>
			</div>
		</header>
	);
}
