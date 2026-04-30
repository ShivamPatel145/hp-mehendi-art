import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import ImageModel from "@/models/Image";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const secretKey = process.env.AUTH_SECRET || "fallback_secret";
const key = new TextEncoder().encode(secretKey);

export async function POST(req: NextRequest) {
  // Verify auth
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { await jwtVerify(token, key); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

  try {
    const formData = await req.formData();
    const category = formData.get("category") as string || "Traditional";
    const folder = formData.get("folder") as string || "hp_mehendi_gallery";
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    await dbConnect();
    const uploaded: any[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            tags: [category],
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      const imageDoc = await ImageModel.create({
        public_id: result.public_id,
        url: result.secure_url,
        category,
        folder,
        alt: `Mehndi Design - ${category}`,
        width: result.width,
        height: result.height,
      });

      uploaded.push(imageDoc);
    }

    return NextResponse.json({ success: true, uploaded });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
