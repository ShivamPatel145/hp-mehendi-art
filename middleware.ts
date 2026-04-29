import { auth } from "@/auth"

export default auth((req) => {
  // Logic is handled in the authorized callback in auth.ts
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
