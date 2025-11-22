"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const links = [
    { label: "HomePage", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "50% off!", href: "/deals" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Logout", href: "/logout", special: true },
  ];

  return (
    <>
      {/* زر الهمبرجر المتحرك (يتحول لـ X) */}
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((p) => !p)}
        className="relative z-50 w-6 h-4  flex flex-col justify-between items-center group focus:outline-none"
      >
        <span
          className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
            open ? "rotate-45 translate-y-[9px]" : ""
          }`}
        />
        <span
          className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${
            open ? "-rotate-45 -translate-y-[5px]" : ""
          }`}
        />
      </button>

      {/* الخلفية الداكنة (Backdrop) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* القائمة المتحركة */}
      <div
        className={`fixed top-0 left-0 h-screen w-full max-w-xs bg-white shadow-2xl z-40
                    transform transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col items-start gap-5 px-8 pt-24 text-lg text-gray-800">
          {links.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`relative transition-all duration-300 ease-out
                          ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
                          ${link.special ? "mt-4 text-red-600 font-semibold" : ""}`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}