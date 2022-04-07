import fs from "fs-extra";

export const isFileExists = (filePath: string) => {
  return fs.existsSync(filePath);
};
