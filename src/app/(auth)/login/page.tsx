/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { useSession } from "next-auth/react";
import { LoadingForm } from "./Loader-login/loading";
import { motion } from "framer-motion";
import React from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl flex gap-12 relative">
        {/* Left Side - Login */}
        <div className="w-3/5 bg-black backdrop-blur-xl rounded-2xl p-12 shadow-xl border border-gray-800/50 hover:border-orange-500/40 transition-all duration-500">
          <div className="space-y-10">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-white tracking-tight">
                {status === "loading"
                  ? "Loading..."
                  : session?.user
                  ? `Hey ${session.user.name}, Welcome!`
                  : "Sign in to LinkZap ⚡️"}
              </h1>
              <p className="text-md text-gray-300/80 mt-3 font-light">
                Access your account with ease.
              </p>
            </div>
            <Suspense fallback={<LoadingForm />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute left-3/5 top-0 h-full w-px bg-gray-700/30" />

        {/* Right Side - Testimonial */}
        <div className="w-2/5 flex flex-col justify-center space-y-10">
          <div className="text-white">
            <h2 className="text-3xl font-semibold tracking-tight">
              User Voices
            </h2>
            <p className="text-gray-300/70 mt-2 font-light">
              See why LinkZap is loved worldwide.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </div>
    </div>
  );
}

// Testimonial Slider Component
function TestimonialSlider() {
  const testimonials = [
    {
      text: "LinkZap has transformed how we share content at Loom. It’s sleek, professional, and saves us so much time!",
      name: "James Carter",
      title: "Product Lead, Loom",
      img: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=2940&auto=format&fit=crop",
      logo: "https://logowik.com/content/uploads/images/loom-icon7460.logowik.com.webp",
    },
    {
      text: "An absolute game-changer for our marketing team. Fast, reliable, and beautifully designed!",
      name: "Sarah Lee",
      title: "Marketing Head, Notion",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2940&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1200px-Notion-logo.svg.png",
    },
    {
      text: "LinkZap’s simplicity and elegance make it a must-have tool for developers!",
      name: "Alex Kim",
      title: "Senior Dev, GitHub",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop",
      logo: "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png",
    },
    {
      text: "The best link-sharing tool I’ve used. Sleek UI and seamless integration!",
      name: "Emily Chen",
      title: "Designer, Figma",
      img: "https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=3087&auto=format&fit=crop",
      logo: "https://logowik.com/content/uploads/images/figma.jpg",
    },
    // New Testimonials for LinkZap Link Shortening SaaS
    {
      text: "LinkZap’s link shortening is a lifesaver for our campaigns. Quick, clean, and trackable!",
      name: "Mark Thompson",
      title: "Growth Manager, HubSpot",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2940&auto=format&fit=crop",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwpVHtxonZg5qxkCy0OLJn_KPWESxC3zduA&s",
    },
    {
      text: "Short links with LinkZap have boosted our click-through rates by 30%. Amazing tool!",
      name: "Priya Patel",
      title: "Digital Strategist, Canva",
      img: "https://images.unsplash.com/photo-1517841902196-6c8e86c88b28?q=80&w=2940&auto=format&fit=crop",
      logo: "https://freepnglogo.com/images/all_img/1691829322canva-app-logo-png.png",
    },
    {
      text: "LinkZap makes URL management effortless. A must for any SaaS business!",
      name: "Liam Brooks",
      title: "CEO, Zapier",
      img: "https://images.unsplash.com/photo-1522556189639-78147b59a4b6?q=80&w=2940&auto=format&fit=crop",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVwOzVey6XcMevohRDman3xgDFw91v8qZfw&s",
    },
    {
      text: "Our team relies on LinkZap for branded short links. It’s fast and flawless!",
      name: "Nina Ortiz",
      title: "Brand Manager, Slack",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2940&auto=format&fit=crop",
      logo: "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200g",
    },
  ];

  const [current, setCurrent] = React.useState(0);

  // Auto-slide functionality
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [testimonials.length]);

  const nextTestimonial = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 100 }} // Start from right
        animate={{ opacity: 1, x: 0 }} // Slide to center
        exit={{ opacity: 0, x: -100 }} // Exit to left
        transition={{
          duration: 0.8, // Slower for smoothness
          ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for buttery smooth motion
          type: "tween",
        }}
        className="bg-black backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-orange-500/40 shadow-lg transition-all duration-500"
      >
        <div className="flex items-center gap-6">
          <img
            src={testimonials[current].img}
            alt="User testimonial"
            className="w-16 h-16 rounded-full object-cover border border-gray-700/30 shadow-sm"
          />
          <div className="space-y-4 flex-1">
            <p className="text-gray-100 text-lg font-light leading-relaxed italic">
              &quot;{testimonials[current].text}&quot;
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[current].logo}
                alt="Company logo"
                className="w-10 h-10 rounded-lg object-contain p-1 bg-white/10 shadow-md"
              />
              <div>
                <p className="text-white font-semibold text-md tracking-tight">
                  {testimonials[current].name}
                </p>
                <p className="text-gray-400 text-sm font-light">
                  {testimonials[current].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevTestimonial}
          className="p-2 bg-gray-800/20 rounded-full hover:bg-orange-500/50 transition-all duration-300 shadow-md"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextTestimonial}
          className="p-2 bg-gray-800/20 rounded-full hover:bg-orange-500/50 transition-all duration-300 shadow-md"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}