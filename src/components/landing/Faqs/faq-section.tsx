import { FaqSectionWithCategories } from "@/components/blocks/faq-with-categories";
// import AnimationContainer from "../components/global/animation-container";

const DEMO_FAQS = [
  {
    question: "What is LinkZap?",
    answer: "LinkZap is an advanced link shortener that allows you to create branded short links, track analytics, and optimize your marketing campaigns with AI-powered insights.",
    category: "General",
  },
  {
    question: "Is LinkZap free to use?",
    answer: "Yes! We offer a free plan that allows you to shorten links, use up to 100 tags, and track up to 1,000 clicks per month. Upgrade for advanced features.",
    category: "Pricing",
  },
  {
    question: "What features are included in the Pro plan?",
    answer: "The Pro plan includes QR code generation, 500 smart tags, branded links with redirects, 20K click tracking, A/B testing, geo-targeting, 24/7 support, and more.",
    category: "Pricing",
  },
  {
    question: "How does click tracking work?",
    answer: "LinkZap provides detailed analytics on every link, including click counts, geographic data, referrer insights, and audience segmentation.",
    category: "Analytics",
  },
  {
    question: "How do AI-powered suggestions work?",
    answer: "LinkZap analyzes your link performance and provides AI-generated recommendations on better keywords, branding, and audience targeting.",
    category: "AI Features",
  },
  {
    question: "How do I contact support?",
    answer: "Our support team is available 24/7 for Pro and Business users. Free users can access community support and self-help resources.",
    category: "Support",
  },
];

export function Faqs() {
  return (
        //   <AnimationContainer delay={0.5}>
    <FaqSectionWithCategories
      title="Frequently Asked Questions"
      description="Find answers to common questions about our services"
      items={DEMO_FAQS}
      contactInfo={{
        title: "Still have questions?",
        buttonText: "Contact Support",
        description: "Need help? Our team is here for you!",
        // onContact: () => console.log("Contact support clicked"),
      }}
    />
   
  )
         
}