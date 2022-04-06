import path from "path";

export const stripPrefixSlash = (v: string): string => {
  if (v.startsWith("/") || v.startsWith("\\")) {
    return v.substring(1);
  }
  return v;
};

export const makePath = (...paths: string[]): string => {
  return path.join(...paths);
};

export const getProjectRoot = (): string => {
  return process.cwd();
};
