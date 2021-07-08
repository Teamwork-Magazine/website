import { useCallback, useRef } from "react";

/**
 * An adaptation of Heydon Pickering's inclusive card component.
 *
 * @see https://inclusive-components.design/cards/
 */
export default function useClickableGroup() {
	const linkRef = useRef<HTMLAnchorElement | null>(null);
	const lastMouseDown = useRef(0);

	const onMouseDown = useCallback(() => {
		lastMouseDown.current = Date.now();
	}, []);

	const onMouseUp = useCallback(() => {
		const link = linkRef.current;
		if (!link) return;

		const now = Date.now();
		const clickMs = now - lastMouseDown.current;

		if (clickMs < 200) {
			link.click();
		}
	}, []);

	return {
		groupProps: {
			className: "u-focus-group",
			onMouseDown,
			onMouseUp,
		},
		linkProps: {
			className: "u-focus-group__deferred",
			ref: linkRef,
		},
	};
}
