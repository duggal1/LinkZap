"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      toast.success("Account created successfully", {
        description: "You have been registered successfully. Please sign in.",
      });
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("registered");
      router.replace(newUrl.toString(), undefined);
    }
  }, [searchParams, router]);

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* <div className="text-center">
        <h1 className="text-3xl font-bold text-white/95 tracking-tight">Welcome Back</h1>
        <p className="text-gray-400 text-sm mt-1">Sign in to your LinkZap account</p>
      </div> */}

      <div className="grid gap-6">
        <Button
          variant="outline"
          disabled={isLoading}
          onClick={handleGithubSignIn}
          className="bg-black hover:bg-gray-900/60 border-gray-800 hover:border-orange-500 text-white 
          transition-all duration-300 rounded-2xl py-7 flex items-center justify-center gap-4 group shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-6 h-6 group-hover:scale-110 transition-transform"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="m26.73,47.67c0,1.1-.01,2.3-.01,3.4,0,.26-.13.51-.34.67-.21.16-.49.2-.74.13-8.4-2.7-14.49-10.58-14.49-19.87,0-11.51,9.34-20.85,20.85-20.85s20.85,9.34,20.85,20.85c0,9.28-6.08,17.15-14.46,19.85-.25.08-.53.03-.74-.13-.21-.16-.34-.4-.34-.67-.02-2.45-.03-5.34-.03-6.65s-1.28-2.39-1.28-2.39c0,0,9.45-1.16,9.45-9.34,0-5.19-2.06-6.94-2.06-6.94.44-1.86.38-3.63-.1-5.31-.07-.24-.31-.4-.56-.38-2.01.18-3.85.91-5.52,2.24,0,0-2.95-.81-5.2-.81h0c-2.25,0-5.2.81-5.2.81-1.67-1.32-3.52-2.06-5.52-2.24-.25-.02-.49.14-.56.38-.48,1.68-.54,3.45-.11,5.31,0,0-2.05,1.75-2.05,6.94,0,8.18,9.45,9.34,9.45,9.34,0,0-1.28,1.08-1.28,2.39v.3c-.72.26-1.7.5-2.8.43-2.99-.2-3.39-3.42-4.62-3.94-.9-.38-1.78-.43-2.45-.37-.2.02-.36.16-.41.35-.05.19.02.39.18.51.81.55,1.89,1.33,2.19,1.9.81,1.52,2.06,3.93,3.67,4.19,1.96.32,3.36.13,4.25-.12h0Z"
            />
          </svg>
          <span className="font-medium text-lg">Sign in with GitHub</span>
        </Button>

        <Button
          variant="outline"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="bg-black hover:bg-gray-900/80 border-gray-800 hover:border-orange-500 text-white 
          transition-all duration-300 rounded-2xl py-7 flex items-center justify-center gap-4 group shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 262"
            className="group-hover:scale-110 transition-transform"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
          <span className="font-medium text-lg">Sign in with Google</span>
        </Button>

        <Button
          disabled={isLoading}
          className="bg-black hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-500 text-white 
          font-semibold rounded-2xl py-7 transition-all duration-300 shadow-lg shadow-orange-500/10 
          border border-gray-800 hover:border-orange-500/70"
        >
          {isLoading && <Loader2 className="mr-2 size-5 animate-spin" />}
          <span className="text-lg">Sign in</span>
        </Button>
      </div>
    </motion.div>
  );
}