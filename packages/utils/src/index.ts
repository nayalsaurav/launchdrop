export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric chars except -
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing -
};

export const generateDomain = (name: string) => {
  const slug = slugify(name);
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${slug}-${suffix}`;
};