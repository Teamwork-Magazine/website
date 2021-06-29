import React from "react";
import Link from "next/link";
import Logo from "components/atoms/Logo";
import Container from "components/atoms/Container";

export default function Header() {
	return (
		<header className="py-8">
			<Container className="flex justify-center">
				<Link href="/">
					<a className="leading-none">
						<Logo />
					</a>
				</Link>
			</Container>
		</header>
	);
}
