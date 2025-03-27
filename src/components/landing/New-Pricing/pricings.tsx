"use client";

import { Pricing } from "@/components/blocks/pricing";
const demoPlans = [
  {
    name: "FREE",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "Shorten links",
      "Up to 100 tags",
      "Customizable branded links",
      "Track clicks (1K clicks/month)",
      "Community support",
      "AI powered suggestions (100 suggestions)",
    ],
    description: "For most individuals",
    buttonText: "Start for free",
    href: "/auth/sign-up?plan=free",
    isPopular: false,
  },
  {
    name: "PRO",
    price: "9",
    yearlyPrice: Math.round(9 * 12 * (1 - 0.12)).toString(), // "94"
    period: "per month",
    features: [
      "Shorten links with QR codes",
      "500 tags with smart sorting",
      "Branded links with redirects",
      "20K clicks/month tracking",
      "Export 1K links data",
      "24/7 priority support",
      "500 AI suggestions",
      "A/B testing",
      "Geo-targeting",
      "Custom domain",
      "Link expiration",
      "5 team members",
      "2025 link security",
      "50+ tool integrations",
      "Audience insights",
    ],
    description: "For small businesses scaling in 2025",
    buttonText: "Get started",
    href: "/auth/sign-up?plan=pro",
    isPopular: true,
  },
  {
    name: "BUSINESS",
    price: "49",
    yearlyPrice: Math.round(49 * 12 * (1 - 0.12)).toString(), // "517"
    period: "per month",
    features: [
      "Unlimited QR code links",
      "Unlimited tags with AI",
      "Branded multi-destination links",
      "Unlimited click tracking",
      "Unlimited data exports",
      "Dedicated manager, 1-hour support",
      "Unlimited AI suggestions",
      "Advanced A/B testing",
      "Global geo-targeting",
      "Multiple custom domains",
      "Bulk link management",
      "Unlimited team access",
      "2025 enterprise security",
      "100+ tool integrations",
      "Audience segmentation",
      "Custom API access",
      "Performance forecasting",
      "White-label option",
      "Multi-channel tracking",
      "DDoS protection",
      "GDPR/CCPA compliance",
      "Team onboarding",
    ],
    description: "For large organizations leading in 2025",
    buttonText: "Contact team",
    href: "/auth/sign-up?plan=business",
    isPopular: false,
  },
];

function PricingBasic() {
  return (
   
      <div className="h-[800px] overflow-y-auto rounded-lg">
        <Pricing 
          plans={demoPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
        />
      </div>
    );
  }
  
  

export { PricingBasic };
