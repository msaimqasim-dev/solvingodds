import { pageMetadata } from "@/lib/metadata";
import { ServicesOverview } from "@/screens/ServicesOverview";
import { SERVICES_OVERVIEW } from "@/data/services";

export const metadata = pageMetadata({
  ...SERVICES_OVERVIEW.seo,
  path: "/services",
  image: SERVICES_OVERVIEW.image.src,
});

export default ServicesOverview;
