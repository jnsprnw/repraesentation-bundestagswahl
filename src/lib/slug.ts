const UMLAUT_MAP: Record<string, string> = {
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  ß: 'ss'
};

export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => UMLAUT_MAP[char])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
