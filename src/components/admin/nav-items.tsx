import {
  AlertTriangleIcon,
  DatabaseIcon,
  LayoutDashboardIcon,
  Link2Icon,
  UsersIcon,
} from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  exact: boolean;
};

export const getNavItems = (): NavItem[] => [
  {
    name: "Overview",
    href: "/admin",
    icon: <LayoutDashboardIcon className="size-4" />,
    exact: true,
  },
  {
    name: "URLs",
    href: "/admin/urls",
    icon: <Link2Icon className="size-4" />,
    exact: true,
  },
  {
    name: "Flagged URLs",
    href: "/admin/urls/flagged",
    icon: <AlertTriangleIcon className="size-4" />,
    exact: true,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: <UsersIcon className="size-4" />,
    exact: true,
  },
  {
    name: "Database",
    href: "/admin/database",
    icon: <DatabaseIcon className="size-4" />,
    exact: true,
  },
];
