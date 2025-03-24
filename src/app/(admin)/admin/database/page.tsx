import { SeedDatabaseButton } from "@/components/admin/seed-database-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Database, RefreshCcw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database Management | Admin | ShortLink",
  description: "Database management tools for ShortLink application",
};

export default function DatabasePage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Database Management
        </h1>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/20 text-purple-500">
                <Database className="size-5" />
              </div>
              <CardTitle>Seed Database</CardTitle>
            </div>
            <CardDescription>
              Populate the database with test data for development and testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 flex items-center gap-3">
                <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              </div>
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                  Development Use Only
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  This tool is intended for development and testing purposes
                  only. Seeding the database will create test users, URLs, and
                  other data.
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <RefreshCcw className="size-4" />
                Seed Database with Test Data
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                This will create test users including an admin user
                (admin@example.com / admin123), sample URLs, and other test data
                needed for development.
              </p>
              <SeedDatabaseButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
