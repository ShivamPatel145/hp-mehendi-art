import dbConnect from "@/lib/db";
import ServiceModel from "@/models/Service";
import ServicesClient from "./ServicesClient";
import { DEFAULT_SERVICES, type Service } from "@/lib/data";

async function getServices(): Promise<Service[]> {
  try {
    await dbConnect();

    const validSlugs = DEFAULT_SERVICES.map((s) => s.slug);

    // Remove any services that are no longer in DEFAULT_SERVICES
    await ServiceModel.deleteMany({ slug: { $nin: validSlugs } });

    // Upsert each default service (preserves admin-edited price/description)
    for (const svc of DEFAULT_SERVICES) {
      await ServiceModel.updateOne(
        { slug: svc.slug },
        { $setOnInsert: { price: svc.price, description: svc.description, image: svc.image, title: svc.title, order: svc.order } },
        { upsert: true }
      );
    }

    const services = await ServiceModel.find({}).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch {
    return DEFAULT_SERVICES.map(s => ({ ...s, _id: s.slug }));
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
