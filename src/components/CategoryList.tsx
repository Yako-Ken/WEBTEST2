"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

function CategoryList() {
  const slides = [
    { src: "https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg", title: "Category 1" },
    { src: "https://images.pexels.com/photos/34612912/pexels-photo-34612912.jpeg", title: "Category 2" },
    { src: "https://images.pexels.com/photos/34627917/pexels-photo-34627917.jpeg", title: "Category 3" },
    { src: "https://images.pexels.com/photos/34627913/pexels-photo-34627913.jpeg", title: "Category 4" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const speed = 1; // pixels per frame for desktop continuous

  // تحقق من حجم الشاشة
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop Continuous Scroll
  useEffect(() => {
    if (isMobile) return; // لا تعمل على الموبايل

    const container = containerRef.current;
    if (!container) return;

    let requestId: number;
    let offset = 0;

    const animate = () => {
      offset -= speed;
      if (container.scrollWidth / 2 <= -offset) offset = 0;
      container.style.transform = `translateX(${offset}px)`;
      requestId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseEnter = () => cancelAnimationFrame(requestId);
    const handleMouseLeave = () => animate();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(requestId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  // Mobile Autoplay Slider
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="overflow-hidden relative mt-8">
      {/* Desktop Continuous Slider */}
      {!isMobile && (
        <div
          ref={containerRef}
          className="flex gap-4 whitespace-nowrap will-change-transform scrollbar-hide"
        >
          {[...slides, ...slides].map((slide, i) => (
            <Link key={i} href="/list?cat=test" className="flex-shrink-0 w-1/4 inline-block hover:scale-[1.01]">
              <div className="relative bg-slate-100 w-full h-96">
                <Image src={slide.src} alt="" fill sizes="20vw" className="object-cover rounded-md" />
              </div>
              <h1 className="mt-4 font-light text-xl tracking-wide">{slide.title}</h1>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Slider with animation like main Slider */}
{isMobile && (
  <div className="relative w-full overflow-hidden h-96">
    <div
      className="flex transition-all ease-in-out duration-1000"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {slides.map((slide, i) => (
        <div key={i} className="min-w-full px-4">
          <Link href="/list?cat=test" className="block w-full">
            <div className="relative bg-slate-100 w-full h-96 rounded-xl overflow-hidden">
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-4 font-light text-xl tracking-wide">
              {slide.title}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}

export default CategoryList;
