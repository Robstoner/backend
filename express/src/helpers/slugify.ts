export function slugifyUser({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): string {
  const first = firstName.replace(/\s+/g, '-').toLowerCase();
  const last = lastName.replace(/\s+/g, '-').toLowerCase();

  const slug =
    first + '-' + last + '-' + Math.random().toString(36).substring(2, 7);

  return slug;
}

export function slugifyProduct({ name }: { name: string }): string {
  const slug =
    name.replace(/\s+/g, '-').toLowerCase() +
    '-' +
    Math.random().toString(36).substring(2, 7);

  return slug;
}
