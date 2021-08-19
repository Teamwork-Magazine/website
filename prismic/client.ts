import Prismic from "@prismicio/client";
import type { IncomingMessage } from "http";
import { apiEndpoint, accessToken } from "./config";

export function createClient(req?: IncomingMessage) {
	return Prismic.client(apiEndpoint, {
		...(accessToken && { accessToken }),
		...(req && { req }),
	});
}

export interface RequestOptions {
	fetchLinks: Set<string>;
}
