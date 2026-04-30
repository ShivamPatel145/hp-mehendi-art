import dbConnect from "@/lib/db";
import ServiceModel from "@/models/Service";
import ServicesClient from "./ServicesClient";
import { DEFAULT_SERVICES, type Service } from "@/lib/data";

async function getServices(): Promise<Service[]> {
  try {
    await dbConnect();
    let services = await ServiceModel.find({}).sort({ order: 1 }).lean();
    if (services.length === 0) {
      await ServiceModel.insertMany(DEFAULT_SERVICES);
      services = await ServiceModel.find({}).sort({ order: 1 }).lean();
    }
    return JSON.parse(JSON.stringify(services));
  } catch {
    return DEFAULT_SERVICES.map(s => ({ ...s, _id: s.slug }));
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
