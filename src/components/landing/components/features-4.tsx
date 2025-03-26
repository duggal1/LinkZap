"use client";


import React from 'react';
import { Cpu, Sparkles, Zap, Box, Lock, Search } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';
import MagicBadge from './ui/magic-badge';
import AnimationContainer from './global/animation-container';


// Define our feature type
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Features() {
  // Features data
  const FEATURES: Feature[] = [
    {
      id: 1,
      title: 'Enterprise Analytics',
      description: 'Track every click, conversion, and campaign with real-time analytics built for high-volume link management.',
      icon: <Zap className="size-5 text-primary" />
    },
    {
      id: 2,
      title: 'Smart Link Routing',
      description: 'AI-powered link optimization that automatically routes traffic for maximum conversion rates and ROI.',
      icon: <Cpu className="size-5 text-primary" />
    },
    {
      id: 3,
      title: 'Custom Branding',
      description: 'Create branded short links that boost recognition and trust, increasing click-through rates by up to 34%.',
      icon: <Sparkles className="size-5 text-primary" />
    },
    {
      id: 4,
      title: 'Security First',
      description: 'Enterprise-grade link protection with malware scanning and advanced access controls for complete peace of mind.',
      icon: <Lock className="size-5 text-primary" />
    },
    {
      id: 5,
      title: 'API Integration',
      description: 'Seamlessly integrate with your existing workflow through our robust API, handling millions of requests daily.',
      icon: <Box className="size-5 text-primary" />
    },
    {
      id: 6,
      title: 'Performance Insights',
      description: 'Deep analytics and AI predictions help optimize your link strategy for maximum engagement and ROI.',
      icon: <Search className="size-5 text-primary" />
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="space-y-12 md:space-y-20 mx-auto px-6 max-w-6xl">
        {/* Header */}
        <AnimationContainer delay={0.3}>
        <div className="z-10 relative space-y-6 mx-auto max-w-2xl text-center">
          <div className="flex justify-center mx-auto mb-4">
          <MagicBadge title="HOW IT WORKS" />
          </div>
          <h2 className="bg-clip-text bg-gradient-to-r from-primary to-primary/80 font-medium text-transparent text-4xl lg:text-5xl text-balance leading-relaxed">Enterprise Link Management for the AI Era</h2>
          <p className="font-medium text-accent-foreground/80">Transform your link infrastructure with LinkZap&apos;s AI-powered platform, trusted by Fortune 500 companies to manage over 1 billion clicks monthly.</p>
        </div>
        </AnimationContainer>
        <AnimationContainer delay={0.4}>
        {/* Features Grid with Glowing Effect */}
        <div className="relative gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        </AnimationContainer>
      </div>
    </section>
  );
}

// Feature Card Component with Glowing Effect
const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <AnimationContainer delay={0.3}>
    <div className="group relative bg-background p-1 border border-border/40 rounded-2xl overflow-hidden transition-all duration-300">
      <div className="relative flex flex-col space-y-4 p-6 rounded-xl transition-colors h-full">
        {/* Apply glowing effect */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.001}
        />
        
        <div className="relative z-10 flex justify-center items-center bg-background/80 p-2 border border-border/20 rounded-xl w-12 h-12">
          {feature.icon}
        </div>
        
        <div className="relative z-10 space-y-2">
          <h3 className="font-medium text-foreground text-lg">{feature.title}</h3>
          <p className="font-light text-sm text-accent-foreground/80">{feature.description}</p>
        </div>
      </div>
    </div>
    </AnimationContainer>
  );
};