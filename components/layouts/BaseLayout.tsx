import { ReactNode } from "react";
import Header from "../organisms/Header";

export interface BaseLayoutProps {
	children?: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
	return (
		<>
			<Header />
			<div>{children}</div>
		</>
	);
}
