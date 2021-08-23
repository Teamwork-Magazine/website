import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { isEnabled } from "./check";

export function withFeatureFlag(feature: string) {
	return function <
		P extends Record<string, any> = Record<string, any>,
		Q extends ParsedUrlQuery = ParsedUrlQuery
	>(getStaticProps: GetStaticProps<P, Q>): GetStaticProps<P, Q> {
		return function (ctx) {
			if (!isEnabled(feature)) {
				return {
					notFound: true,
				};
			}

			return getStaticProps(ctx);
		};
	};
}
