"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// blog.types.ts
export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image_url: string;
  categories?: Category[]; // 👈 add this
};

type SliderProps = {
  posts: Post[];
};



export default function Slider({ posts }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [posts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (!posts?.length) return null;

  return (
    <div className="relative w-full h-[234px] lg:h-[323px] overflow-hidden rounded-xl shadow-md">
      {/* Slides */}
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blogs/${post.categories?.[0]?.slug}/${post.slug}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-lg md:text-2xl font-semibold">{post.title}</h2>
            {post.excerpt && (
              <p className="hidden md:block mt-1 text-sm text-gray-200 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
        </Link>
      ))}

      {/* Prev button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white"
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute z-10 top-1/2 right-3 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white"
      >
        ›
      </button>

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
  {posts.map((_, index) => (
    <button
      key={index}
      onClick={() => goToSlide(index)}
      className={`h-2 rounded-full transition-all duration-300 ${
        index === currentIndex
          ? "w-6 bg-white"
          : "w-2 bg-white/50 hover:bg-white/70"
      }`}
    />
  ))}
</div>

    </div>
  );
}
