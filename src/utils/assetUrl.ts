/**
 * Resolves static asset paths located in public/ so they work both locally,
 * in AI Studio preview, and when deployed to GitHub Pages (subpaths like /repo-name/).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || './';

  if (baseUrl === './') {
    return `./${cleanPath}`;
  }

  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
}
