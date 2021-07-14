import BaseLayout from "../components/layouts/BaseLayout";
import { GetStaticProps } from "next";
import { Navigation } from "../prismic/types/navigation";
import { createClient } from "../prismic/client";
import { getNavigation } from "../prismic/queries/navigation";

export interface HomePageProps {
	navigation: Navigation;
}

export default function HomePage({ navigation }: HomePageProps) {
	return (
		<BaseLayout navigation={navigation}>
			<main>
				<h1 className="sr-only">Teamwork Magazine</h1>
			</main>
		</BaseLayout>
	);
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	const client = createClient();
	const navigation = await getNavigation(client);

	return {
		props: {
			navigation,
		},
	};
};
