import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export default function LoginPage(props: { searchParams: { error?: string } }) {
  const { searchParams } = props;
  const error = searchParams?.error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-accent/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage the gallery.</p>
        </div>

        <form
          action={async (formData) => {
            "use server"
            try {
              await signIn("credentials", formData)
            } catch (error) {
              if (error instanceof AuthError) {
                switch (error.type) {
                  case "CredentialsSignin":
                    redirect("/admin/login?error=CredentialsSignin")
                  default:
                    redirect("/admin/login?error=UnknownError")
                }
              }
              throw error // Rethrow to let Next.js handle redirect
            }
          }}
          className="space-y-4"
        >
          {error === "CredentialsSignin" && (
            <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm text-center">
              Invalid username or password
            </div>
          )}
          {error === "UnknownError" && (
            <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm text-center">
              Something went wrong.
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              className="w-full px-4 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-md font-medium transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
