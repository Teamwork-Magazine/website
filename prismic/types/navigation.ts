import { Document } from "@prismicio/client/types/documents";
import { LinkedDocument, PrismicSlice } from "../interfaces";
import { Schema } from "../schema";
import { PageLink, PageSchema } from "./page";
import { SectionLink, SectionSchema } from "./section";

interface NavigationSliceConfig {
	location: "Header only" | "Footer only" | "Header and Footer" | null;
}

interface PrismicSectionLinkSliceConfig extends NavigationSliceConfig {
	section: LinkedDocument | null;
}

interface PrismicPageLinkSliceConfig extends NavigationSliceConfig {
	page: LinkedDocument | null;
}

export type PrismicSectionLinkSlice = PrismicSlice<
	"link_to_section",
	PrismicSectionLinkSliceConfig,
	never
>;

export type PrismicPageLinkSlice = PrismicSlice<
	"link_to_page",
	PrismicPageLinkSliceConfig,
	never
>;

type PrismicNavigationSlice = PrismicSectionLinkSlice | PrismicPageLinkSlice;

interface NavigationItem {
	isInHeader: boolean;
	isInFooter: boolean;
}

export interface SectionLinkItem extends NavigationItem {
	section: SectionLink;
}

export interface PageLinkItem extends NavigationItem {
	page: PageLink;
}

export interface Navigation {
	sections: SectionLinkItem[];
	pages: PageLinkItem[];
}

export const NavigationSchema = new Schema<Document, Navigation>({
	sections(doc) {
		const { body = [] } = doc.data as { body?: PrismicNavigationSlice[] };
		return body.filter(isSectionSlice).map(toSectionLink);
	},
	pages(doc) {
		const { body = [] } = doc.data as { body?: PrismicNavigationSlice[] };
		return body.filter(isPageSlice).map(toPageLink);
	},
});

function isSectionSlice(
	slice: PrismicNavigationSlice
): slice is PrismicSectionLinkSlice {
	return (
		slice.slice_type === "link_to_section" &&
		slice.primary.section?.isBroken === false
	);
}

function isPageSlice(
	slice: PrismicNavigationSlice
): slice is PrismicPageLinkSlice {
	return (
		slice.slice_type === "link_to_page" &&
		slice.primary.page?.isBroken === false
	);
}

function toSectionLink(slice: PrismicSectionLinkSlice): SectionLinkItem {
	return {
		...parseLocation(slice),
		section: SectionSchema.cast(slice.primary.section as Document, [
			"slug",
			"name",
		]),
	};
}

function toPageLink(slice: PrismicPageLinkSlice): PageLinkItem {
	return {
		...parseLocation(slice),
		page: PageSchema.cast(slice.primary.page as Document, ["slug", "title"]),
	};
}

function parseLocation(slice: PrismicNavigationSlice): NavigationItem {
	const location = slice.primary.location ?? "Header and Footer";
	return {
		isInHeader: location === "Header only" || location === "Header and Footer",
		isInFooter: location === "Footer only" || location === "Header and Footer",
	};
}
