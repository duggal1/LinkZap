// import Link from 'next/link';
// import { AnimationContainer, Icons } from "@/components"
// import { TextHoverEffect } from "@/components/ui/text-hover-effect"
// import { NewFooter } from '@/app/(marketing)/Footer/new-footer';

import AnimationContainer from "../global/animation-container"
import { TextHoverEffect } from "../ui/text-hover-effect"
import { NewFooter } from "./Footer/new-footer"

const Footer = () => {
    return (
        <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">

            <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

         <NewFooter />
<div className=' flex flex-col items-start justify-start w-full mt-8 md:flex-row md:justify-between'>
                <AnimationContainer delay={0.4}>
                    <p className="text-base text-neutral-300  tracking-tight  font-medium leading-snug mt-8 md:mt-0">
                        &copy; {new Date().getFullYear()} LinkZap INC. All rights reserved.
                    </p>
                </AnimationContainer>
                </div>

            <div className="h-[20rem] lg:h-[20rem] hidden md:flex items-center justify-center">
                <TextHoverEffect text="LINKZAP" />
            </div>
           
            
        </footer>

    )
}

export default Footer
