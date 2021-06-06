import fs from "fs";
import path from "path";
import * as Models from "prismic/models";

const DIR = path.join("prismic", "__generated__", "content-types");

const KB = 1024;
const MB = KB * 1000;
function humanSize(bytes: number): string {
	if (bytes < KB) {
		return `${bytes}B`;
	} else if (bytes < MB) {
		const kilobytes = bytes / KB;
		return `${kilobytes.toFixed(2)}KB`;
	} else {
		const megabytes = bytes / MB;
		return `${megabytes.toFixed(2)}MB`;
	}
}

try {
	fs.mkdirSync(DIR, { recursive: true });
} catch (e) {
	if (e?.code !== "EEXIST") {
		console.error(e);
		process.exit(1);
	}
}

for (const model of Object.values(Models)) {
	const filename = model.name + ".json";

	const definition = JSON.stringify(model, null, 2);
	const buffer = Buffer.from(definition);

	try {
		fs.writeFileSync(path.join(DIR, filename), buffer);
		console.log(`✅ ${filename} (${humanSize(buffer.byteLength)})`);
	} catch (e) {
		console.error(`❌ ${filename}`);
		console.error(e);
		process.exitCode = 1;
	}
}
