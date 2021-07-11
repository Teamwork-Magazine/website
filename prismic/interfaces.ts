export interface PrismicSlice<
	T extends string,
	P extends object = {},
	I extends object = {}
> {
	slice_type: T;
	slice_label: string | null;
	primary: P;
	items: I[];
}
