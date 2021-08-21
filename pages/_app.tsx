import { AppProps } from "next/dist/next-server/lib/router/router";
import BaseLayout, { BaseLayoutProps } from "../components/layouts/BaseLayout";
import "../styles/globals.css";

interface AppPropsWithLayoutProps extends AppProps {
	pageProps: {
		layoutProps: Omit<BaseLayoutProps, "children">;
	};
}

export default function App({ Component, pageProps }: AppPropsWithLayoutProps) {
	const { layoutProps, ...otherProps } = pageProps;
	return (
		<BaseLayout {...layoutProps}>
			<Component {...otherProps} />
		</BaseLayout>
	);
}
