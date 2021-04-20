export async function collect<T>(iterable: AsyncIterableIterator<T>): Promise<T[]> {
	const arr: T[] = []

	for await (const item of iterable) {
		arr.push(item)
	}

	return arr
}
