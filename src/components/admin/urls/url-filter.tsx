"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Flag, FlagIcon, ShieldIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface UrlFilterProps {
  initialFilter: string;
}

export function UrlFilter({ initialFilter }: UrlFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (filter: string) => {
    router.push(`${pathname}?${createQueryString("filter", filter)}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={initialFilter === "all" ? "default" : "outline"}
        size={"sm"}
        onClick={() => handleFilterChange("all")}
        className="gap-2"
      >
        All URLs
      </Button>

      <Button
        variant={initialFilter === "flagged" ? "secondary" : "outline"}
        size={"sm"}
        onClick={() => handleFilterChange("flagged")}
        // className="gap-2 text-red-600 dark:text-red-400"
      >
        <FlagIcon className="size-4" />
        All Flagged
      </Button>

      <Button
        variant={initialFilter === "security" ? "secondary" : "outline"}
        size={"sm"}
        onClick={() => handleFilterChange("security")}
        className="gap-2 text-red-600 dark:text-red-400"
      >
        <ShieldIcon className="size-4" />
        Security Risks
      </Button>

      <Button
        variant={initialFilter === "inappropriate" ? "secondary" : "outline"}
        size={"sm"}
        onClick={() => handleFilterChange("inappropriate")}
        className="gap-2 text-orange-600 dark:text-orange-400"
      >
        <AlertTriangle className="size-4" />
        Innappropriate Content
      </Button>

      <Button
        variant={initialFilter === "other" ? "secondary" : "outline"}
        size={"sm"}
        onClick={() => handleFilterChange("other")}
        className="gap-2 text-yellow-600 dark:text-yellow-400"
      >
        <Flag className="size-4" />
        Other Flags
      </Button>
    </div>
  );
}
