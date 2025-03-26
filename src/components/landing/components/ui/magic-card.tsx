"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

const MagicCard = ({ children, className, containerClassName }: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative max-w-md overflow-hidden rounded-xl border border-border/60 bg-gradient-to-r from-background via-background/95 to-background/90 p-4 md:p-6 transition-all duration-500 ease-out",
                className,
                containerClassName
            )}
        >
            <div
                className="absolute -inset-px opacity-0 transition-all duration-700 ease-in-out pointer-events-none"
                style={{
                    opacity,
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255,165,0,0.35), rgba(255,140,0,0.2), transparent 75%)`,
                }}
            />
            <div
                className="absolute -inset-px opacity-0 blur-xl transition-all duration-700 ease-in-out pointer-events-none"
                style={{
                    opacity: opacity * 0.5,
                    background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(255,165,0,0.25), rgba(255,140,0,0.15), transparent 60%)`,
                }}
            />
            {children}
        </div>
    );
};

export default MagicCard;