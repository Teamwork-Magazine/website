import BaseLayout from "../components/layouts/BaseLayout";
import { GetStaticProps } from "next";

export interface HomePageProps {}

export default function HomePage() {
	return (
		<BaseLayout>
			<main>
				<h1 className="sr-only">Teamwork Magazine</h1>
			</main>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	return {
		props: {},
	};
};
