export default function slugify(firstName: string, lastName: string) {
  const first = firstName.replace(/\s+/g, "-").toUpperCase();
  const last = lastName.replace(/\s+/g, "-").toUpperCase();

  const slug =
    first + "-" + last + "-" + Math.random().toString(36).substring(2, 7);

  return slug;
}
