import path from "path";
import { fileURLToPath } from "url";

function getDirname(fileUrl: string) {
  return path.dirname(fileURLToPath(fileUrl));
}

export default getDirname;
