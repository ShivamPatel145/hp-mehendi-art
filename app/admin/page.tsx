import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import AdminDashboard from "./AdminDashboard"

export default async function AdminPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {session.user?.name}</p>
          </div>
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}>
            <button type="submit" className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors text-sm font-medium">
              Sign Out
            </button>
          </form>
        </div>
        
        <div className="bg-card border border-accent/20 rounded-2xl p-6 shadow-sm">
          <AdminDashboard />
        </div>
      </div>
    </div>
  )
}
