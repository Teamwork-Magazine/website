import fs from "fs";
import path from "path";
import { Person } from "prismic/models/person";

const DIR = path.join("prismic", "__generated__", "content-types");

try {
	fs.mkdirSync(DIR, { recursive: true });
} catch (e) {
	if (e?.code !== "EEXIST") {
		console.error(e);
		process.exit(1);
	}
}

const models = [Person];

for (const model of models) {
	const filename = model.name + ".json";

	const definition = JSON.stringify(model, null, 2);
	const buffer = Buffer.from(definition);

	try {
		fs.writeFileSync(path.join(DIR, filename), buffer);
		console.log(`✅ ${filename} (${buffer.byteLength}B)`);
	} catch (e) {
		console.error(`❌ ${filename}`);
		console.error(e);
		process.exitCode = 1;
	}
}
