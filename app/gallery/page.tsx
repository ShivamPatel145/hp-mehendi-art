import { getGalleryImages } from "@/lib/cloudinary";
import GalleryClient from "./GalleryClient";

export const revalidate = 60; // Revalidate every minute so new uploads show up

export default async function GalleryPage() {
  const images = await getGalleryImages();
  
  return <GalleryClient initialImages={images} />;
}
