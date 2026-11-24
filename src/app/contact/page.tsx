import { CONTACT_PAGE, resolveServiceFromQuery } from "@/data/contact";
import { pageMetadata } from "@/lib/metadata";
import { Contact } from "@/screens/Contact";

export const metadata = pageMetadata({
  ...CONTACT_PAGE.seo,
  path: "/contact",
});

export default async function Page({ searchParams }: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const requestedService = Array.isArray(service) ? service[0] : service;
  return <Contact queryService={resolveServiceFromQuery(requestedService ?? null)} />;
}
