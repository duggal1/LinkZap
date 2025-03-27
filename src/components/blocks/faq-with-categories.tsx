"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimationContainer from "../landing/components/global/animation-container";

interface FaqSectionWithCategoriesProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: {
    question: string;
    answer: string;
    category?: string;
  }[];
  contactInfo?: {
    title: string;
    description?: string;
    buttonText: string;
    onContact?: () => void;
  };
}

const FaqSectionWithCategories = React.forwardRef<HTMLElement, FaqSectionWithCategoriesProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <AnimationContainer delay={0.5}>
      <section
        ref={ref}
        className={cn("py-16 w-full", className)}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-foreground">
                {title}
              </h2>
              {description && (
                <p className="text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            {/* FAQ Items */}
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={cn(
                    "mb-4 rounded-xl",
                    "bg-card text-card-foreground",
                    "border border-border/60",
                    "shadow-sm dark:shadow-orange-600/50"
                  )}
                >
                  <AccordionTrigger 
                    className={cn(
                      "px-6 py-4 text-left hover:no-underline",
                      "data-[state=open]:border-b data-[state=open]:border-border/60"
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      {item.category && (
                        <Badge
                          variant="secondary"
                          className="w-fit text-xs font-medium text-orange-600 border  border-orange-600/40 bg-orange-600/20 hover:bg-black"
                        >
                          {item.category}
                        </Badge>
                      )}
                      <h3 className="text-lg font-medium text-foreground group-hover:text-primary">
                        {item.question}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-4 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Contact Section */}
            {contactInfo && (
              <div className="mt-12 text-center">
                <p className=" text-white/80 text-xl tracking-tight  mb-4">
                  {contactInfo.title}
                </p>
                {contactInfo.description && (
                  <p className="text-zinc-300/80 mb-4">
                    {contactInfo.description}
                  </p>
                )}
          <Button
  size="sm"
  onClick={contactInfo.onContact}
  className="relative bg-gradient-to-br from-orange-500 to-orange-700 text-white font-semibold tracking-tight rounded-md px-5 py-2 transition-all duration-200 ease-out hover:from-orange-600 hover:via-lime-600 hover:to-orange-600 hover:border  hover:text-white/70 hover:border-orange-200 active:scale-98 group overflow-hidden"
>
  <span className="relative z-10">{contactInfo.buttonText}</span>
  {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform -skew-x-6"></div> */}
</Button>
              </div>
            )}
          </div>
        </div>
      </section>
      </AnimationContainer>
    );
  }
);
FaqSectionWithCategories.displayName = "FaqSectionWithCategories";

export { FaqSectionWithCategories };