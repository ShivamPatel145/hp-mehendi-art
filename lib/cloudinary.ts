import { v2 as cloudinary } from 'cloudinary';

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
  alt: string;
  width: number;
  height: number;
};

export async function getGalleryImages(): Promise<CloudinaryImage[]> {
  try {
    const results = await cloudinary.search
      .expression('resource_type:image')
      .with_field('tags')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();
      
    return results.resources.map((resource: any) => ({
      id: resource.public_id,
      src: resource.secure_url,
      // Map the first tag to the category, or default to a safe value
      category: resource.tags && resource.tags.length > 0 ? resource.tags[0] : "Traditional", 
      alt: `Mehndi Design - ${resource.public_id}`,
      width: resource.width,
      height: resource.height,
    }));
  } catch (error) {
    console.error("Error fetching from Cloudinary:", error);
    return [];
  }
}
