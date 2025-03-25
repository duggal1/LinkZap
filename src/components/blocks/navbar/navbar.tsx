"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useSession } from "next-auth/react";
import { LucideIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import AnimationContainer from "./nav-con";
import { NAV_LINKS } from "./nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
    { value: 12, clicks: 15 },
    { value: 18, clicks: 22 },
    { value: 25, clicks: 28 },
    { value: 20, clicks: 23 },
    { value: 28, clicks: 32 },
    { value: 35, clicks: 38 },
    { value: 40, clicks: 45 },
    { value: 38, clicks: 42 },
    { value: 45, clicks: 48 },
];

const Navbar = () => {

    const { data: session } = useSession();

    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 8) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={cn(
            "sticky top-0 inset-x-0 h-14 w-full border-b border-transparent z-[99999] select-none",
            scroll && "border-background/80 bg-background/40 backdrop-blur-md"
        )}>
            <AnimationContainer reverse delay={0.1} className="size-full">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center space-x-4">

                        <Link href="/#home" className="flex items-center gap-2">
                            <Image
                                src="/linkzap1.png"
                                alt="Linkzap"
                                width={40}
                                height={40}
                            />
                            <span className="text-lg font-bold font-heading !leading-none">
                                LINKZAP
                            </span>
                        </Link>

                            <NavigationMenu className="hidden lg:flex">
                                <NavigationMenuList>
                                    {NAV_LINKS.map((link) => (
                                        <NavigationMenuItem key={link.title}>
                                            {link.menu ? (
                                                <>
                                                    <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className={cn(
                                                            "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                                            link.title === "Features" ? "lg:grid-cols-[.75fr_1fr]" : "lg:grid-cols-2"
                                                        )}>
                                                            {link.title === "Features" && (
                                                                <li className="row-span-4 pr-2 relative rounded-lg overflow-hidden h-[200px]">
                                                                    <NavigationMenuLink asChild className="h-full">
                                                                        <Link
                                                                            href="/"
                                                                            className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-black p-6 no-underline outline-none focus:shadow-md relative"
                                                                        >
                                                                            {/* Chart container inside black bg */}
                                                                            <div className="absolute inset-0 opacity-30">
                                                                                <ResponsiveContainer width="100%" height="100%">
                                                                                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                                                        <defs>
                                                                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                                                                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                                                                            </linearGradient>
                                                                                        </defs>
                                                                                        <Area
                                                                                            type="monotone"
                                                                                            dataKey="value"
                                                                                            stroke="#f97316"
                                                                                            strokeWidth={2}
                                                                                            fillOpacity={1}
                                                                                            fill="url(#colorValue)"
                                                                                            dot={false}
                                                                                            isAnimationActive={true}
                                                                                            animationDuration={2000}
                                                                                        />
                                                                                    </AreaChart>
                                                                                </ResponsiveContainer>
                                                                            </div>

                                                                            {/* Grid pattern overlay */}
                                                                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(38,38,38,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20"></div>

                                                                            {/* Content */}
                                                                            <h6 className="mb-2 text-lg font-medium relative z-10">
                                                                                All Features
                                                                            </h6>
                                                                            <p className="text-sm leading-tight text-muted-foreground relative z-10">
                                                                                Manage links, track performance, and more.
                                                                            </p>
                                                                        </Link>
                                                                    </NavigationMenuLink>
                                                                </li>
                                                            )}
                                                            {link.menu.map((menuItem) => (
                                                                <ListItem
                                                                    key={menuItem.title}
                                                                    title={menuItem.title}
                                                                    href={menuItem.href}
                                                                    icon={menuItem.icon}
                                                                >
                                                                    {menuItem.tagline}
                                                                </ListItem>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </>
                                            ) : (
                                                <Link href={link.href} legacyBehavior passHref>
                                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 
                                                        "hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:shadow-lg")}>
                                                        {link.title}
                                                    </NavigationMenuLink>
                                                </Link>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>

                        </div>

                        <div className="hidden lg:flex items-center">
                            {session ? (
                                <div className="flex items-center">
                                    <Link href="/dashboard" className={buttonVariants({ size: "sm", })}>
                                        Dashboard
                                        <ZapIcon className="size-3.5 ml-1.5 text-lime-500 fill-lime-500" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-4">
                                    <Link href="/login" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                        Sign In
                                    </Link>
                                    <Link href="/register" className={buttonVariants({ size: "sm", })}>
                                        Get Started
                                        <ZapIcon className="size-3.5 ml-1.5 text-orange-500 fill-orange-500" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AnimationContainer>
        </header>
    )
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href!}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-gradient-to-r hover:from-orange-500/90  hover:to-orange-600/85 hover:text-white  hover:shadow-lg focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center space-x-2  text-white">
                        <Icon className="h-4 w-4" />
                        <h6 className="text-sm font-medium  text-white !leading-none">
                            {title}
                        </h6>
                    </div>
                    <p title={children! as string} className="line-clamp-1 text-sm leading-snug text-white/90 ">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Navbar