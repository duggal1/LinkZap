import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  Database,
  Link2Icon,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard | ShirtLink",
  description: "Admin dashboard for ShirtLink",
};

export default function AdminPage() {
  const adminModules = [
    {
      title: "URL Management",
      description: "View, edit, and manage all shortened URLs",
      icon: <Link2Icon className="size-5" />,
      href: "/admin/urls",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Flagged URLs",
      description: "Review and moderate flagged URLs",
      icon: <AlertTriangle className="size-5" />,
      href: "/admin/urls/flagged",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: <Users className="size-5" />,
      href: "/admin/users",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
    },
    {
      title: "Database Management",
      description: "Seed and manage database data",
      icon: <Database className="size-5" />,
      href: "/admin/database",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {adminModules.map((module) => (
            <Card key={module.href} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-md ${module.bgColor} ${module.color}`}
                  >
                    {module.icon}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={module.href}>
                  <Button
                    variant={"outline"}
                    className="w-full justify-between group"
                  >
                    Go to {module.title}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
