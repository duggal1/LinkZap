/* eslint-disable @typescript-eslint/no-unused-vars */
import { UrlShortenerForm } from "@/components/urls/url-shortener-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-24">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Shorten Your Links 
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Paste your long URL and get a shortened one. It&apos;s free and easy to
          use.
        </p>

        <UrlShortenerForm />
      </div>
    </div>
  );
}
