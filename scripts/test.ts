import path from "path";
import { fileURLToPath } from "url";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const notesDir = argv._[0];

console.log(notesDir);
