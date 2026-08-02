const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://sketchy-portfolio.vercel.app");

export const siteUrl = new URL(configuredUrl);
export const siteName = "Soumen Nath";
export const siteTitle = "Soumen Nath — Software Engineer & AI Systems Builder";
export const siteDescription =
  "Portfolio of Soumen Nath, a software engineer building production AI systems, data platforms, connected products, and reliable full-stack applications.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function toIsoDate(date: string) {
  return new Date(date).toISOString();
}
