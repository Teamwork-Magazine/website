import Prismic from "@prismicio/client";
import type { IncomingMessage } from "http";
import { apiEndpoint, accessToken } from "./config";

const __fetch = fetch;
global.fetch = function tracedFetch(...args) {
	console.log("fetch:", ...args);
	return __fetch(...args);
};

export function createClient(req?: IncomingMessage) {
	return Prismic.client(apiEndpoint, {
		...(accessToken && { accessToken }),
		...(req && { req }),
	});
}

export interface RequestOptions {
	fetchLinks: Set<string>;
}
