"use client";

import { usePathname } from "next/navigation";
import { getNavItems, NavItem } from "./nav-items";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const navItems = getNavItems();

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }

    if (
      item.href === "/admin/urls" &&
      pathname.includes("/admin/urls/flagged")
    ) {
      return false;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-14 md:z-30 border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Admin Dashbboard</h2>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item: NavItem) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <Link href={"/dashboard"}>
          <Button
            variant={"outline"}
            size={"sm"}
            className="w-full justify-start gap-2"
          >
            <ChevronRight className="size-4" />
            Back to App
          </Button>
        </Link>
      </div>
    </div>
  );
}
