import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    console.log("No session, redirecting to login");
    return redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "admin") {
    console.log("Not admin, redirecting to dashboard", session.user);
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen pt-14">
      <div className="flex flex-1 w-full">
        <AdminSidebar />
        <main className="flex-1 ml-0 md:ml-64 overflow-auto">
          <div className="container py-6 md:py-8 px-4 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
