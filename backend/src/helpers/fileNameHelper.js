import { fileURLToPath } from "url";
import { dirname } from "path";

const fileNameHelper = (meta) => {
  const __filename = fileURLToPath(meta.url);
  const __dirname = dirname(__filename);

  return { __dirname, __filename };
};

export default fileNameHelper;
