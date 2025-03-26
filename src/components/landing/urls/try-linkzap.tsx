import { UrlShortenerForm } from "@/components/urls/url-shortener-form";

const TryLinkzaps = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-transparent backdrop-blur-sm p-6 md:p-24">
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent animate-gradient">
            Shorten Your Links
          </h1>
          <p className="text-lg text-gray-300/80 font-light max-w-2xl mx-auto leading-relaxed">
            Paste your long URL and get a shortened one. It&apos;s fast, free, and incredibly simple.
          </p>
        </div>

        <div className=" backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-zinc-700 transition-all duration-300">
          <UrlShortenerForm />
        </div>
      </div>
    </div>
  );
}

export default TryLinkzaps;