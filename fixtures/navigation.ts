import { Navigation } from "../prismic/types/navigation";

export const Default: Navigation = {
	sections: [
		{
			section: {
				slug: "longform",
				name: "Longform",
			},
			isInHeader: true,
			isInFooter: true,
		},
		{
			section: {
				slug: "photo-essay",
				name: "Photo Essay",
			},
			isInHeader: true,
			isInFooter: true,
		},
		{
			section: {
				slug: "profile",
				name: "Profile",
			},
			isInHeader: true,
			isInFooter: true,
		},
	],
	pages: [
		{
			page: {
				slug: "about-us",
				title: "About Us",
			},
			isInHeader: true,
			isInFooter: true,
		},
	],
};
