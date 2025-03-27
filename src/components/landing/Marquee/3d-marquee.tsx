"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ThreeDMarquees() {
  const images = [
"https://linkzap.vercel.app/images/image1.png",
"https://linkzap.vercel.app/images/image2.png",
  "https://linkzap.vercel.app/images/image3.png",
  "https://cdn.dribbble.com/userupload/12062319/file/original-7e59141c27ebd98c6c66276f47ac6b9b.png?format=webp&resize=400x300&vertical=center",
  "https://i.ytimg.com/vi/zgIyzEEXfiA/maxresdefault.jpg",
  "https://linkzap.vercel.app/images/image3.png",
  "https://linkzap.vercel.app/images/image3.png",
  "https://linkzap.vercel.app/images/image1.png", 
   "https://linkzap.vercel.app/images/image3.png",
    "https://linkzap.vercel.app/images/image2.png", 
     "https://linkzap.vercel.app/images/image1.png", 
      "https://linkzap.vercel.app/images/image3.png",  
      "https://linkzap.vercel.app/images/image1.png", 
       "https://linkzap.vercel.app/images/image1.png", 
        "https://linkzap.vercel.app/images/image2.png", 
         "https://linkzap.vercel.app/images/image2.png",
           "https://linkzap.vercel.app/images/image2.png",
  ];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-black p-2 ring-1 ring-neutral-700/10 ">
      <ThreeDMarquee images={images} />
    </div>
  );
}