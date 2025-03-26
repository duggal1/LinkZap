/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useRef } from "react";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { REVIEWS } from "./testimonies-constant";
import MagicCard from "./magic-card";


// Define the Review type structure
interface Review {
  name: string;
  username: string;
  review: string;
  rating: number;
  userImage?: string;
  companyName?: string;
  companyLogo?: string;
}

const VerticalTestimonialScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstColumnRef = useRef<HTMLDivElement | null>(null);
  const secondColumnRef = useRef<HTMLDivElement | null>(null);
  const thirdColumnRef = useRef<HTMLDivElement | null>(null);
  
  // Split reviews into three columns
  const firstColumn = REVIEWS.slice(0, 3);
  const secondColumn = REVIEWS.slice(3, 6);
  const thirdColumn = REVIEWS.slice(6, 9);

  const animateColumn = (
    element: HTMLDivElement,
    duration: number,
    reverse: boolean = false,
    delay: number = 0
  ): (() => void) | undefined => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const columnHeight = element.scrollHeight;
    const viewHeight = element.clientHeight;
    const scrollDistance = columnHeight - viewHeight;
    
    if (scrollDistance <= 0) return;
    
    // Ultra smooth easing function
    const easeInOutSmoothStep = (x: number): number => {
      const y = Math.max(0, Math.min(1, x));
      return y * y * y * (y * (y * 6 - 15) + 10);
    };
    
    const step = (currentTime: number): void => {
      if (!startTime) startTime = currentTime + delay;
      
      if (currentTime < startTime) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }
      
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      
      const easedProgress = reverse 
        ? 1 - easeInOutSmoothStep(progress)
        : easeInOutSmoothStep(progress);
        
      element.scrollTop = easedProgress * scrollDistance;
      animationFrameId = requestAnimationFrame(step);
    };
    
    animationFrameId = requestAnimationFrame(step);
    
    return () => animationFrameId && cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    const firstColumn = firstColumnRef.current;
    const secondColumn = secondColumnRef.current;
    const thirdColumn = thirdColumnRef.current;
    
    if (!firstColumn || !secondColumn || !thirdColumn) return;
    
    // Even smoother speeds with staggered timing
    const cleanup1 = animateColumn(firstColumn, 50000, false, 0);
    const cleanup2 = animateColumn(secondColumn, 65000, true, 100);
    const cleanup3 = animateColumn(thirdColumn, 45000, false, 50);
    
    return () => {
      cleanup1?.();
      cleanup2?.();
      cleanup3?.();
    };
  }, []);
  
  const TestimonialCard: React.FC<{ review: Review }> = ({ review }) => (
    <MagicCard 
      className="hover:shadow-xl mb-6 border-0 w-full 
      hover:scale-[1.02] transition-all duration-700 ease-out
      hover:bg-gradient-to-br hover:from-orange-500/40 hover:to-orange-400/20
      group backdrop-blur-sm"
      containerClassName="group"
    >
      <CardHeader className="px-5 pt-5 pb-3">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {review.userImage && (
              <div className="relative border-2 border-foreground/5 
                group-hover:border-orange-500/40 rounded-full w-12 h-12 overflow-hidden 
                group-hover:scale-105 transition-transform duration-700">
                <Image 
                  src={review.userImage} 
                  alt={review.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out"
                />
              </div>
            )}
            <div>
              <CardTitle className="font-medium text-foreground/90 
                group-hover:text-transparent group-hover:bg-gradient-to-r 
                group-hover:from-orange-500 group-hover:to-orange-400 
                group-hover:bg-clip-text text-base tracking-tight transition-all duration-300">
                {review.name}
              </CardTitle>
              <CardDescription className="font-thin text-foreground/60 text-xs leading-relaxed tracking-wide">
                {review.username}
              </CardDescription>
            </div>
          </div>
          
          {review.companyLogo && (
            <div className="relative opacity-80 group-hover:opacity-100 ml-auto w-auto h-8 transition-all duration-500">
              <img
                src={review.companyLogo} 
                alt={review.companyName || "Company"}
                className="rounded-full max-w-[100px] h-full object-contain"
              />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-5 py-3">
        <p className="font-medium text-foreground/80 group-hover:text-foreground/90 text-sm leading-relaxed tracking-tight transition-colors duration-300">
          {review.review}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center px-5 pt-2 pb-4">
        {review.companyName && (
          <span className="font-semibold text-foreground/50 group-hover:text-foreground/70 text-xs tracking-wide transition-colors duration-300">
            {review.companyName}
          </span>
        )}
        
        <div className="flex space-x-1 ml-auto">
          {Array.from({ length: review.rating }, (_, i) => (
            <StarIcon 
              key={i} 
              className="fill-orange-500 w-3.5 h-3.5 text-orange-500  
              group-hover:scale-110 group-hover:text-orange-400 transition-transform duration-300" 
              style={{ 
                transitionDelay: `${i * 50}ms` 
              }}
            />
          ))}
        </div>
      </CardFooter>
    </MagicCard>
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "600px" }}
    >
      <div className="absolute inset-0 flex justify-between gap-8 px-4">
        {/* First Column */}
        <div 
          ref={firstColumnRef}
          className={cn(
            "flex-1 overflow-hidden",
            "scrollbar-hide"
          )}
        >
          <div className="pt-12 pb-24">
            {firstColumn.map((review, index) => (
              <TestimonialCard 
                key={`col1-${index}`}
                review={review}
              />
            ))}
            {firstColumn.map((review, index) => (
              <TestimonialCard 
                key={`col1-dupe-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>
        
        {/* Second Column */}
        <div 
          ref={secondColumnRef}
          className={cn(
            "flex-1 overflow-hidden",
            "scrollbar-hide"
          )}
        >
          <div className="pt-12 pb-24">
            {secondColumn.map((review, index) => (
              <TestimonialCard 
                key={`col2-${index}`}
                review={review}
              />
            ))}
            {secondColumn.map((review, index) => (
              <TestimonialCard 
                key={`col2-dupe-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>
        
        {/* Third Column */}
        <div 
          ref={thirdColumnRef}
          className={cn(
            "flex-1 overflow-hidden",
            "scrollbar-hide"
          )}
        >
          <div className="pt-12 pb-24">
            {thirdColumn.map((review, index) => (
              <TestimonialCard 
                key={`col3-${index}`}
                review={review}
              />
            ))}
            {thirdColumn.map((review, index) => (
              <TestimonialCard 
                key={`col3-dupe-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Softer gradient overlays */}
      <div className="top-0 z-10 absolute inset-x-0 bg-gradient-to-b from-background via-background/95 to-transparent h-32 pointer-events-none"></div>
      <div className="bottom-0 z-10 absolute inset-x-0 bg-gradient-to-t from-background via-background/95 to-transparent h-32 pointer-events-none"></div>
    </div>
  );
};

export default VerticalTestimonialScroll;