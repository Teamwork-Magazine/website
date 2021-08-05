import sharp from "sharp";

const dataURLCache = new Map<string, string>();

export async function generateBlurURL(url: string): Promise<string> {
	if (dataURLCache.has(url)) {
		return dataURLCache.get(url)!;
	}
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(
			`Could not generate a blur URL from ${url}: Response not OK (HTTP ${res.status} - ${res.statusText}).`
		);
	}

	if (!res.headers.get("Content-Type")?.startsWith("image/")) {
		throw new Error(`Could not generate a blur URL from ${url}: Not an image.`);
	}

	try {
		const buffer = Buffer.from(await res.arrayBuffer());
		const dataURL = await generateDataURLFromBuffer(buffer);

		dataURLCache.set(url, dataURL);

		return dataURL;
	} catch (e) {
		throw new Error(`Could not generate a blur URL from ${url}: ${e}`);
	}
}

function generateDataURLFromBuffer(buffer: Buffer): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		sharp(buffer)
			.raw()
			.ensureAlpha()
			.resize(10, 10, { fit: "inside" })
			.jpeg()
			.toBuffer((err, buffer, { width, height }) => {
				if (err) return reject(err);
				resolve("data:image/jpeg;base64," + buffer.toString("base64"));
			});
	});
}
