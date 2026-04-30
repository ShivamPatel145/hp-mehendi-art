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

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { await jwtVerify(token, key); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

  try {
    const { public_id } = await req.json();
    if (!public_id) return NextResponse.json({ error: "No public_id provided" }, { status: 400 });

    await cloudinary.uploader.destroy(public_id);
    await dbConnect();
    await ImageModel.deleteOne({ public_id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
