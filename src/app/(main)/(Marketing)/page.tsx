import FeaturesGrid from "@/components/landing/features-4";
import { AnimationContainer, MaxWidthWrapper } from "@/components/landing/components";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CreditCardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MagicBadge from "@/components/landing/components/ui/magic-badge";
import { BentoCard, BentoGrid, CARDS } from "@/components/landing/components/ui/bento-grid";
import { PROCESS } from "@/components/landing/constants/misc";
import MagicCard from "@/components/landing/components/ui/magic-card";
import VerticalTestimonialScroll from "@/components/landing/Testimonials/Testimonials";
import Companies from "@/components/landing/Companies/hero-companies";
import { AnimatedGradientTexts } from "@/components/landing/header/cta";
import TryLinkzaps from "@/components/landing/urls/try-linkzap";
import { BorderBeam } from "@/components/magicui/border-beam";
import { PricingBasic } from "@/components/landing/New-Pricing/pricings";
import { Connect } from "@/components/landing/Cta/cta";
import { Faqs } from "@/components/landing/Faqs/faq-section";

const HomePage = async () => {
  return (
    <div className="overflow-x-hidden scrollbar-hide size-full">
      {/* Hero Section */}
      <MaxWidthWrapper className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full text-center py-8 sm:py-12 lg:py-16">
          <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">
            <AnimatedGradientTexts />
            <h1 className="text-foreground text-center py-4 sm:py-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium tracking-normal text-balance !leading-[1.15] w-full font-heading">
              Professional Links with{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-lime-400 bg-clip-text font-medium">
                Purpose
              </span>
            </h1>
            <p className="mb-8 sm:mb-12 text-base sm:text-lg md:text-xl tracking-tight text-neutral-300 text-balance font-light px-2 sm:px-0">
              Transform your link management with LinkZap.
              <br className="hidden md:block" />
              <span className="hidden md:block">
                Advanced analytics, enterprise features, and complete control.
              </span>
            </p>
            <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
              <Button asChild>
                <Link href={"/dashboard"} className="flex items-center text-sm sm:text-base">
                  Start creating for free
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </AnimationContainer>

          <AnimationContainer
            delay={0.2}
            className="relative pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 px-2 bg-transparent w-full"
          >
            <div className="absolute md:top-[10%] left-1/2 w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow bg-gradient-to-r from-orange-500 to-orange-700"></div>
            <div className="relative -m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
              <BorderBeam size={250} duration={12} delay={9} />
              <Image
                src="/linkzap-dashboard.png"
                alt="Dashboard"
                width={1200}
                height={1200}
                quality={100}
                className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border w-full"
                priority
              />
              <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
              <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
            </div>
          </AnimationContainer>
        </div>
      </MaxWidthWrapper>
      <AnimationContainer delay={0.4}>
        <TryLinkzaps />
      </AnimationContainer>

      {/* Companies Section */}
      <MaxWidthWrapper className="px-4 sm:px-6 lg:px-8">
        <AnimationContainer delay={0.4}>
          <div className="py-12 sm:py-16 lg:py-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Empowering Industry Leaders
            </h1>
            <p className="text-base sm:text-lg lg:text-xl tracking-normal font-medium leading-snug text-neutral-400/90 mt-4 max-w-2xl mx-auto">
              Leading companies trust us to optimize their link management
              <br className="hidden sm:block" /> with advanced analytics and seamless integration.
            </p>
            <Companies />
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>

      {/* Features Section */}
      <MaxWidthWrapper className="pt-8 sm:pt-10 lg:pt-12 px-4 sm:px-6 lg:px-8">
        <AnimationContainer delay={0.1}>
          <div className="flex flex-col w-full items-center justify-center py-6 sm:py-8 lg:py-10">
            <MagicBadge title="Features" />
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-4 sm:mt-6">
              Enterprise-Grade Link Management
            </h2>
            <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg text-neutral-300 max-w-md sm:max-w-lg font-light">
              LinkZap delivers powerful tools for professionals who demand excellence in link management and analytics.
            </p>
          </div>
        </AnimationContainer>
        <AnimationContainer delay={0.2}>
          <BentoGrid className="py-6 sm:py-8 lg:py-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {CARDS.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </AnimationContainer>
      </MaxWidthWrapper>
      <FeaturesGrid />

      {/* Process Section */}
      <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <AnimationContainer delay={0.1}>
          <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 lg:py-10 max-w-xl mx-auto">
            <MagicBadge title="The Process" />
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-4 sm:mt-6">
              Professional Link Management in{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text">
                5 Steps
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg text-neutral-300 max-w-md sm:max-w-lg font-light">
              Streamline your workflow with LinkZap&apos;s intuitive process.
            </p>
          </div>
        </AnimationContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full py-6 sm:py-8 gap-4 sm:gap-6 lg:gap-8">
          {PROCESS.map((process, id) => (
            <AnimationContainer delay={0.2 * id} key={id}>
              <MagicCard className="group h-[260px] sm:h-[280px] p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-lime-400/10 backdrop-blur-xl">
                <div className="flex flex-col items-start justify-between w-full h-full">
                  <div className="relative w-full">
                    <span className="absolute -top-2 right-0 bg-black/80 border border-neutral-900 p-[2px] rounded-full backdrop-blur-sm">
                      <div className="bg-zinc-900 rounded-full w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center font-mono text-lg sm:text-xl text-neutral-400">
                        {id + 1}
                      </div>
                    </span>
                    <process.icon
                      strokeWidth={1.5}
                      className="w-10 sm:w-12 h-10 sm:h-12 text-foreground transition-colors duration-300 group-hover:text-orange-500"
                    />
                  </div>
                  <div className="flex flex-col items-start mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-lime-400 group-hover:bg-clip-text">
                      {process.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              </MagicCard>
            </AnimationContainer>
          ))}
        </div>
      </MaxWidthWrapper>

      {/* Pricing Section */}
      <MaxWidthWrapper className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <AnimationContainer delay={0.1}>
          <div></div>
        </AnimationContainer>
        <AnimationContainer delay={0.2}>
          <PricingBasic />
        </AnimationContainer>
        <AnimationContainer delay={0.3}>
          <div className="flex flex-wrap items-start md:items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
              <span className="text-muted-foreground text-sm sm:text-base">
                No credit card required
              </span>
            </div>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>

      {/* Reviews Section */}
      <MaxWidthWrapper className="px-4 sm:px-6 lg:px-8">
        <AnimationContainer delay={0.1}>
          <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 lg:py-10 max-w-xl mx-auto">
            <MagicBadge title="Our Customers" />
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-4 sm:mt-6">
              What our users are saying
            </h2>
            <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg text-muted-foreground max-w-md sm:max-w-lg">
              Here&lsquo;s what some of our users have to say about Linkify.
            </p>
          </div>
          <VerticalTestimonialScroll />
        </AnimationContainer>
      </MaxWidthWrapper>

      <AnimationContainer delay={0.4}>
        <Faqs />
      </AnimationContainer>

      <AnimationContainer delay={0.4}>
        <Connect />
      </AnimationContainer>
    </div>
  );
};

export default HomePage;