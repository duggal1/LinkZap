/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { useSession } from "next-auth/react";
import { LoadingForm } from "./Loader-login/loading";
import { motion } from "framer-motion"; // For smooth animations
import React from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="w-full max-w-5xl flex gap-12">
        {/* Left Side - Login */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-3/5 bg-black/90 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-gray-800 hover:border-orange-500/90 transition-all duration-300"
        >
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white/95 tracking-tight">
                {status === "loading"
                  ? "Loading..."
                  : session?.user
                  ? `Hey ${session.user.name}, welcome back!`
                  : "Sign in to LinkZap ⚡️"}
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Choose a sign-in method below to continue.
              </p>
            </div>
            <Suspense fallback={<LoadingForm />}>
              <LoginForm />
            </Suspense>
          </div>
        </motion.div>

        {/* Right Side - Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-2/5 flex flex-col justify-center space-y-8"
        >
          <div className="text-white">
            <h2 className="text-2xl font-semibold tracking-tight">
              Don’t take our word for it
            </h2>
            <p className="text-gray-400 mt-1">
              See how real users are loving LinkZap
            </p>
          </div>
          <TestimonialSlider />
        </motion.div>
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
      logo: "https://logowik.com/content/uploads/images/notion8625.jpg",
    },
    {
      text: "LinkZap’s simplicity and elegance make it a must-have tool for developers!",
      name: "Alex Kim",
      title: "Senior Dev, GitHub",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop",
      logo: "https://logowik.com/content/uploads/images/github3770.jpg",
    },
    {
      text: "The best link-sharing tool I’ve used. Sleek UI and seamless integration!",
      name: "Emily Chen",
      title: "Designer, Figma",
      img: "https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      logo: "https://logowik.com/content/uploads/images/figma.jpg",
    },
  ];

  const [current, setCurrent] = React.useState(0);

  const nextTestimonial = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="bg-black/90 backdrop-blur-2xl rounded-3xl p-6 border border-gray-900 hover:border-orange-500/90 shadow-2xl transition-all duration-300"
      >
        <div className="flex items-start gap-4">
          <img
            src={testimonials[current].img}
            alt="User testimonial"
            className="w-14 h-14 rounded-full object-cover border border-gray-700"
          />
          <div>
            <p className="text-gray-300 text-sm italic">&quot;{testimonials[current].text}&quot;</p>
            <div className="mt-4 flex items-center gap-2">
              <img src={testimonials[current].logo} alt="Company logo" className="w-6 h-6" />
              <div>
                <p className="text-white/95 font-medium text-sm">{testimonials[current].name}</p>
                <p className="text-gray-400/70 text-xs">{testimonials[current].title}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
        <button onClick={prevTestimonial} className="p-2 bg-gray-800/50 rounded-full hover:bg-orange-500/50 transition-all">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
        <button onClick={nextTestimonial} className="p-2 bg-gray-800/50 rounded-full hover:bg-orange-500/50 transition-all">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}