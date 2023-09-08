export default function slugify(title: string) {
  const slug = title.replace(/\s+/g, '-').toUpperCase() + '-' + Math.random().toString(36).substring(2, 7);

  return slug;
}
