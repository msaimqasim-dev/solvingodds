import { notFound } from "next/navigation";
import { SERVICES, SERVICE_LIST, servicePath } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { ServiceDetail } from "@/screens/ServiceDetail";

export const dynamicParams = false;

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_LIST.map(({ slug }) => ({ slug }));
}

async function getService(params: ServicePageProps["params"]) {
  const { slug } = await params;
  if (!Object.prototype.hasOwnProperty.call(SERVICES, slug)) notFound();
  return SERVICES[slug];
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = await getService(params);
  return pageMetadata({
    ...service.seo,
    path: servicePath(service.slug),
    image: service.heroImage.src,
  });
}

export default async function Page({ params }: ServicePageProps) {
  const service = await getService(params);
  return <ServiceDetail service={service} />;
}
