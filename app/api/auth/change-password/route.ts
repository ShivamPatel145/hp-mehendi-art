import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET || "fallback_secret";
const key = new TextEncoder().encode(secretKey);

export async function POST(req: NextRequest) {
  // Verify auth
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  let payload: any;
  try { 
    const result = await jwtVerify(token, key);
    payload = result.payload;
  } catch { 
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    await dbConnect();
    const admin = await Admin.findOne({ username: payload.username });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
