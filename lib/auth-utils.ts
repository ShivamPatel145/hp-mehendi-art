import { SignJWT } from "jose";

const secretKey = process.env.AUTH_SECRET || "fallback_secret";
const key = new TextEncoder().encode(secretKey);

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}
