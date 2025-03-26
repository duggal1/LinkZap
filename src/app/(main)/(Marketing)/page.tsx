

import FeaturesGrid from "@/components/landing/features-4";
import { AnimationContainer, MaxWidthWrapper, PricingCards } from "@/components/landing/components";
import { BorderBeam } from "@/components/landing/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CreditCardIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MagicBadge from "@/components/landing/components/ui/magic-badge";
import { BentoCard, BentoGrid, CARDS } from "@/components/landing/components/ui/bento-grid";
import { PROCESS } from "@/components/landing/constants/misc";
import MagicCard from "@/components/landing/components/ui/magic-card";
import VerticalTestimonialScroll from "@/components/landing/Testimonials/Testimonials";
import Companies from "@/components/landing/Companies/hero-companies";
import { AnimatedGradientTexts } from "@/components/landing/header/cta";

const HomePage = async () => {

   
    return (
        <div className="overflow-x-hidden scrollbar-hide size-full">
            {/* Hero Section */}
            <MaxWidthWrapper>
                <div className="flex flex-col items-center justify-center w-full text-center">
                    <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">
                    <AnimatedGradientTexts/>
                        <h1 className="text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.15] w-full font-heading">
                            Professional Links with <span className="text-transparent bg-gradient-to-r from-orange-500 to-lime-400 bg-clip-text font-medium">
                                Purpose
                            </span>
                        </h1>
                        <p className="mb-12 text-lg tracking-tight text-neutral-300 md:text-xl text-balance font-light">
                            Transform your link management with LinkZap.
                            <br className="hidden md:block" />
                            <span className="hidden md:block">Advanced analytics, enterprise features, and complete control.</span>
                        </p>
                        <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
                            <Button asChild>
                                <Link href={"/dashboard"} className="flex items-center">
                                    Start creating for free
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </AnimationContainer>

                    <AnimationContainer delay={0.2} className="relative pt-20 pb-20 md:py-32 px-2 bg-transparent w-full">
                 
                    {/* <div 
    className="top-1/4 left-1/2 -z-10 absolute bg-[conic-gradient(from_45deg_at_50%_50%,#cc3300,#66cc00,#cc3300,#66cc00,#cc3300)] opacity-80 blur-[8rem] lg:blur-[12rem] w-3/4 h-1/2 -translate-x-1/2 -translate-y-1/2 animate-[glow_4s_ease-in-out_infinite]"
></div> */}
<div className="absolute md:top-[10%] left-1/2 w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow bg-gradient-to-r from-orange-500 to-orange-700"></div>



                        <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                            <BorderBeam
                                size={250}
                                duration={12}
                                delay={9}
                            />
                            <Image
                                src="/assets/dashboard-dark.svg"
                                alt="Dashboard"
                                width={1200}
                                height={1200}
                                quality={100}
                                className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
                            />
                            <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                            <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                        </div>
                    </AnimationContainer>
                </div>
            </MaxWidthWrapper >

            {/* Companies Section */}
            <MaxWidthWrapper>
                <AnimationContainer delay={0.4}>
                    <div className="py-14">
                       
                            <Companies/>
                             
                  
                            </div>
                   
                    </AnimationContainer>
                    </MaxWidthWrapper>
            {/* Features Section */}
            <MaxWidthWrapper className="pt-10">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col w-full items-center lg:items-center justify-center py-8">
                        <MagicBadge title="Features" />
                        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Enterprise-Grade Link Management
                        </h2>
                        <p className="mt-4 text-center lg:text-center text-lg text-neutral-300 max-w-lg font-light">
                            LinkZap delivers powerful tools for professionals who demand excellence in link management and analytics.
                        </p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2}>
                    <BentoGrid className="py-8">
                        {CARDS.map((feature, idx) => (
                            <BentoCard key={idx} {...feature} />
                        ))}
                    </BentoGrid>
                </AnimationContainer>
            </MaxWidthWrapper>
            <FeaturesGrid/>
            {/* Process Section */}
<MaxWidthWrapper className="py-20 ">
    <AnimationContainer delay={0.1}>
        <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
            <MagicBadge title="The Process" />
            <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                Professional Link Management in <span className="text-transparent bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text">3 Steps</span>
            </h2>
            <p className="mt-4 text-center lg:text-center text-lg text-neutral-300 max-w-lg font-light">
                Streamline your workflow with LinkZap&apos;s intuitive process.
            </p>
        </div>
    </AnimationContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-8 gap-6 md:gap-8">
        {PROCESS.map((process, id) => (
            <AnimationContainer delay={0.2 * id} key={id}>
                <MagicCard className="group h-[280px] md:py-8 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-lime-400/10 backdrop-blur-xl">
                    <div className="flex flex-col items-start justify-between w-full h-full p-6">
                        <div className="relative w-full">
                            <span className="absolute -top-2 right-0 bg-black/80 border border-neutral-900 p-[2px] rounded-full backdrop-blur-sm">
                                <div className="bg-zinc-900 rounded-full w-10 h-10 flex items-center justify-center font-mono text-xl text-neutral-400">
                                    {id + 1}
                                </div>
                            </span>
                            <process.icon 
                                strokeWidth={1.5} 
                                className="w-12 h-12 text-foreground transition-colors duration-300 group-hover:text-orange-500" 
                            />
                        </div>
                        <div className="flex flex-col items-start mt-6 space-y-3">
                            <h3 className="text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-lime-400 group-hover:bg-clip-text">
                                {process.title}
                            </h3>
                            <p className="text-sm text-muted-foreground/80 leading-relaxed">
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
            <MaxWidthWrapper className="py-10">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
                        <MagicBadge title="Simple Pricing" />
                        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Enterprise Solutions for Every Scale
                        </h2>
                        <p className="mt-4 text-center lg:text-center text-lg text-neutral-300 max-w-lg font-light">
                            Choose the perfect LinkZap plan for your organization&apos;s needs.
                        </p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2}>
                    <PricingCards />
                </AnimationContainer>
                <AnimationContainer delay={0.3}>
                    <div className="flex flex-wrap items-start md:items-center justify-center lg:justify-evenly gap-6 mt-12 max-w-5xl mx-auto w-full">
                        <div className="flex items-center gap-2">
                            <CreditCardIcon className="w-5 h-5 text-foreground" />
                            <span className="text-muted-foreground">
                                No credit card required
                            </span>
                        </div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>

            {/* Reviews Section */}
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
                        <MagicBadge title="Our Customers" />
                        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            What our users are saying
                        </h2>
                        <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                            Here&apos;s what some of our users have to say about Linkify.
                        </p>
                    </div>
                </AnimationContainer>
                <VerticalTestimonialScroll/>
         

           

        </div>
    )
};

export default HomePage