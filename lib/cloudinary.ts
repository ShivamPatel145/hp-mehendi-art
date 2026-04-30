import { v2 as cloudinary } from 'cloudinary';
import dbConnect from './db';
import ImageModel from '@/models/Image';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type CloudinaryImage = {
  id: string;
  src: string;
  category: string;
  folder: string;
  alt: string;
  width: number;
  height: number;
};

export async function getCloudinaryFolders(): Promise<string[]> {
  try {
    const result = await cloudinary.api.root_folders();
    return result.folders.map((f: any) => f.name);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return ["hp_mehendi_gallery"];
  }
}

export async function getGalleryImages(): Promise<CloudinaryImage[]> {
  try {
    await dbConnect();
    const images = await ImageModel.find({}).sort({ createdAt: -1 }).lean();

    return images.map((img: any) => ({
      id: img.public_id,
      src: img.url,
      category: img.category,
      folder: img.folder || "",
      alt: img.alt || `Mehndi Design`,
      width: img.width || 800,
      height: img.height || 600,
    }));
  } catch (error) {
    console.error("Error fetching images from DB:", error);
    return [];
  }
}
