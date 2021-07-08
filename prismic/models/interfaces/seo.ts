import { text } from "../../fields/text";
import { Sluggable } from "./sluggable";

export function SEO() {
	return {
		...Sluggable(),
		metaTitle: text({
			label: "Meta Title (30-60 characters)",
			placeholder: "Title for search results and social media",
			group: "SEO",
		}),
		metaDescription: text({
			label: "Meta Description (70-160 characters)",
			placeholder: "Short description for search results and social media",
			group: "SEO",
		}),
	};
}
