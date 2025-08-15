export function slugify(title: string, id?: number) {
  const s = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return id ? `${s}-${id}` : s;
}
