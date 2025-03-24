import { UrlFilter } from "@/components/admin/urls/url-filter";
import { UrlSearch } from "@/components/admin/urls/url-search";
import { UrlsTable } from "@/components/admin/urls/urls-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllUrls } from "@/server/actions/admin/urls/get-all-urls";
import { auth } from "@/server/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "URL Management | Admin | ShortLink",
  description: "Manage URLs in the ShortLink application",
};

export default async function AdminUrlsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    filter?: string;
  }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user.role !== "admin") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search || "";
  const sortBy = (params.sortBy || "createdAt") as
    | "originalUrl"
    | "shortCode"
    | "createdAt"
    | "clicks"
    | "userName";
  const sortOrder = (params.sortOrder || "desc") as "asc" | "desc";
  const filter = (params.filter || "all") as
    | "all"
    | "flagged"
    | "security"
    | "inappropriate"
    | "other";

  const getHighlightStyle = () => {
    switch (filter) {
      case "security":
        return "security";
      case "inappropriate":
        return "inappropriate";
      case "other":
        return "other";
      default:
        return "none";
    }
  };

  const response = await getAllUrls({
    page,
    limit: 10,
    search,
    sortBy,
    sortOrder,
    filter,
  });

  const urls = response.success && response.data ? response.data.urls : [];
  const total = response.success && response.data ? response.data.total : 0;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">URL Management</h1>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>URLs</CardTitle>
                <CardDescription>
                  View and manage all URLs in the system.
                </CardDescription>
              </div>
              <UrlSearch initialSearch={search} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <UrlFilter initialFilter={filter} />
              <UrlsTable
                urls={urls}
                total={total}
                currentPage={page}
                currentSearch={search}
                currentSortBy={sortBy}
                currentSortOrder={sortOrder}
                highlightStyle={getHighlightStyle()}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
