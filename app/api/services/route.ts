import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ServiceModel from "@/models/Service";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { DEFAULT_SERVICES } from "@/lib/data";

const secretKey = process.env.AUTH_SECRET || "fallback_secret";
const key = new TextEncoder().encode(secretKey);

export async function GET() {
  try {
    await dbConnect();

    let services = await ServiceModel.find({}).sort({ order: 1 }).lean();

    // Seed defaults if DB is empty
    if (services.length === 0) {
      await ServiceModel.insertMany(DEFAULT_SERVICES);
      services = await ServiceModel.find({}).sort({ order: 1 }).lean();
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Services GET error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { await jwtVerify(token, key); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

  try {
    const { slug, price, description } = await req.json();

    if (!slug || !price) {
      return NextResponse.json({ error: "slug and price are required" }, { status: 400 });
    }

    await dbConnect();

    const updated = await ServiceModel.findOneAndUpdate(
      { slug },
      { price, ...(description && { description }) },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error("Services PUT error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}
