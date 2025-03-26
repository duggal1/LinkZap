/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Define props type
interface TextHoverEffectProps {
  text: string;
  color?: "orange-lime-yellow";
  weight?: "normal" | "bold";
  size?: "sm" | "md" | "lg" | "xl";
  borderColor?: string;
}

export const TextHoverEffect = ({
  text,
  color = "orange-lime-yellow",
  weight = "bold",
  size = "lg",
  borderColor = "rgba(255, 255, 255, 0.15)",
}: TextHoverEffectProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate text sizing
  const textLength = text.length;
  const viewBoxWidth = Math.max(300, textLength * 40);
  const viewBoxHeight = 100;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

  // Select gradient colors based on prop
  let gradientColors;
  switch (color) {
    case "orange-lime-yellow":
      gradientColors = [
        { offset: "0%", color: "#ff5100" },  // Deep Orange
        { offset: "50%", color: "#ff5e00" }, // Lime
        { offset: "100%", color: "#ff6f00" } // Yellow
      ];
      break;
    default:
      gradientColors = [
        { offset: "0%", color: "#ff4800" },
        { offset: "33%", color: "#ff6200" },
        { offset: "66%", color: "#ffae00" },
        { offset: "100%", color: "#ffd900" }
      ];
  }

  // Size classes based on prop
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  }[size];

  // Font weight based on prop
  const fontWeight = weight === "bold" ? "font-bold" : "font-normal";

  return (
    <motion.svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="select-none"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <linearGradient
          id="flowGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientTransform="rotate(0)"
        >
          <motion.stop
            offset="0%"
            stopColor={hovered ? "#FF6B00" : "#FF6B00"}
            animate={{ stopColor: hovered ? ["#FF6B00", "#FFD700", "#C0FF00", "#FF6B00"] : "#FF6B00" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            offset="50%"
            stopColor={hovered ? "#FFD700" : "#FFD700"}
            animate={{ stopColor: hovered ? ["#FFD700", "#C0FF00", "#FF6B00", "#FFD700"] : "#FFD700" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            offset="100%"
            stopColor={hovered ? "#C0FF00" : "#C0FF00"}
            animate={{ stopColor: hovered ? ["#C0FF00", "#FF6B00", "#FFD700", "#C0FF00"] : "#C0FF00" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </linearGradient>
      </defs>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="transparent"
        stroke={hovered ? "url(#flowGradient)" : borderColor}
        strokeWidth={hovered ? "0.3" : "0.15"}
        strokeDasharray="none"
        strokeDashoffset="0"
        className={`font-sans ${fontWeight} ${sizeClasses}`}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.text>
    </motion.svg>
  );
};