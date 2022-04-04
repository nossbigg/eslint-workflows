export const stripPrefixSlash = (v: string): string => {
  if (v.startsWith("/") || v.startsWith("\\")) {
    return v.substring(1);
  }
  return v;
};
