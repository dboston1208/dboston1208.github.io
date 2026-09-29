// App routes get client-side navigation; static files like /resume.pdf live
// in public/ outside the router, and #anchors stay on the page.
export const isRoute = (href: string) => href.startsWith("/") && !href.includes(".");
