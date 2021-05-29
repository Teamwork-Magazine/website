import { PreviewData } from "next";

interface PreviewDataWithRef {
	ref: string;
}

export function hasRef(data: PreviewData): data is PreviewDataWithRef {
	return (
		typeof data === "object" && (data as PreviewDataWithRef).ref !== undefined
	);
}
