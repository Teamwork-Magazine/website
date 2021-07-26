import { useMemo } from "react";
import { ReactNode } from "react";
import { Navigation } from "../../prismic/types/navigation";
import Header from "../organisms/Header";

export interface BaseLayoutProps {
	navigation: Navigation;
	children?: ReactNode;
}

export default function BaseLayout({ navigation, children }: BaseLayoutProps) {
	return (
		<>
			<Header
				sections={navigation.sections
					.filter((item) => item.isInHeader)
					.map((item) => item.section)}
				pages={navigation.pages
					.filter((item) => item.isInHeader)
					.map((item) => item.page)}
			/>
			<div>{children}</div>
		</>
	);
}
