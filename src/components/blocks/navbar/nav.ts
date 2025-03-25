/* eslint-disable @typescript-eslint/no-unused-vars */
import { BarChart, Database, HelpCircleIcon, LineChartIcon, Link2, Link2Icon, LockIcon, NewspaperIcon, QrCode, QrCodeIcon, ShieldAlert, Users } from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Features",
        href: "/features",
        menu: [
            {
                title: "Link Shortening",
                tagline:  "Easily shorten links and monitor their performance.",
                href: "/stats",
                icon: Link2Icon,
            },
            {
                title: "Password Protection",
                tagline: "Protect your links with secure password access.",
                href: "/dashboard",
                icon: LockIcon,
            },
            {
                title: "Advanced Analytics",
                tagline: "Gain insights into who is clicking your links.",
                href: "/dashboard/stats",
                icon: LineChartIcon,
            },
            {
                title: "Custom QR Codes",
                tagline: "Generate and customize QR codes for easy sharing.",
                href: "/features/qr-codes",
                icon: QrCodeIcon,
            },
        ],

    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Enterprise",
        href: "/enterprise",
    },
    {
        title: "Resources",
        href: "/resources",
        menu: [
            {
                title: "Blog",
                tagline: "Read articles on the latest trends in tech.",
                href: "/resources/blog",
                icon: NewspaperIcon,
            },
            {
                title: "Help",
                tagline: "Get answers to your questions.",
                href: "/resources/help",
                icon: HelpCircleIcon,
            },
        ]
    },
    {
        title: "Changelog",
        href: "/changelog",
    },
   {
    title: "Admin",
    href: "/admin",
    menu: [
        {
            title: "Link Shortening URLs",
              tagline: "Manage and track shortened links.",
            href: "/admin/urls",
            icon: Link2,
        },
        {
            title: "Flagged URLs",
              tagline: "Review and handle flagged links.",
            href: "/admin/urls/flagged",
            icon: ShieldAlert,
        },
        {
            title: "Admin Management",
              tagline: "Oversee admin users and permissions.",
            href: "/admin/users",
            icon: Users,
        },
        {
            title: "Seeding",
              tagline: "Populate the database with test data.",
            href: "/admin/database",
            icon: Database,
        },
        ],
    },
];