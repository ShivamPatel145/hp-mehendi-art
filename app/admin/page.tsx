import { redirect } from "next/navigation"
import AdminDashboard from "@/app/admin/AdminDashboard"
import { getGalleryImages, getCloudinaryFolders } from "@/lib/cloudinary"
import { cookies } from "next/headers"
import dbConnect from "@/lib/db"
import ServiceModel from "@/models/Service"
import { DEFAULT_SERVICES } from "@/lib/data"


async function getServices() {
  try {
    await dbConnect();
    let services = await ServiceModel.find({}).sort({ order: 1 }).lean();
    if (services.length === 0) {
      await ServiceModel.insertMany(DEFAULT_SERVICES);
      services = await ServiceModel.find({}).sort({ order: 1 }).lean();
    }
    return JSON.parse(JSON.stringify(services));
  } catch {
    return DEFAULT_SERVICES.map(s => ({ ...s, _id: s.slug }));
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  if (!token) {
    redirect("/admin/login")
  }

  const [images, folders, services] = await Promise.all([
    getGalleryImages(),
    getCloudinaryFolders(),
    getServices(),
  ]);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your gallery & services.</p>
          </div>
          <form action={async () => {
            "use server"
            const asyncCookies = await cookies();
            asyncCookies.delete("admin_token");
            redirect("/admin/login");
          }}>
            <button type="submit" className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors text-sm font-medium">
              Sign Out
            </button>
          </form>
        </div>
        
        <div className="bg-card border border-accent/20 rounded-2xl p-6 shadow-sm">
          <AdminDashboard initialImages={images} initialFolders={folders} initialServices={services} />
        </div>
      </div>
    </div>
  )
}

