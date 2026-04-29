import { getGalleryImages } from "@/lib/cloudinary";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Revalidate every minute so new uploads show up

export default async function HomePage() {
  const images = await getGalleryImages();
  
  return <HomeClient images={images} />;
}
