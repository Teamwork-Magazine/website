import sharp from "sharp";
import { encode } from "blurhash";

const hashCache = new Map<string, string>();

export function getCachedBlurHash(url: string): string | null {
	return hashCache.get(url) ?? null;
}

export async function generateBlurHash(url: string): Promise<string> {
	if (hashCache.has(url)) {
		return hashCache.get(url)!;
	}
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(
			`Could not generate a blur hash from ${url}: Response not OK (HTTP ${res.status} - ${res.statusText}).`
		);
	}

	if (!res.headers.get("Content-Type")?.startsWith("image/")) {
		throw new Error(
			`Could not generate a blur hash from ${url}: Not an image.`
		);
	}

	try {
		const buffer = Buffer.from(await res.arrayBuffer());
		const hash = await generateBlurHashFromBuffer(buffer);

		hashCache.set(url, hash);

		return hash;
	} catch (e) {
		throw new Error(`Could not generate a blur hash from ${url}: ${e}`);
	}
}

function generateBlurHashFromBuffer(buffer: Buffer): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		sharp(buffer)
			.raw()
			.ensureAlpha()
			.resize(20, 20, { fit: "inside" })
			.toBuffer((err, buffer, { width, height }) => {
				if (err) return reject(err);
				resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
			});
	});
}
