"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { restaurantConfig } from "@/src/data/restaurant";

const navLinks = [
  { id: "hero", label: "الرئيسية" },
  { id: "menu", label: "المنيو" },
  { id: "about", label: "عن المطعم" },
  { id: "reviews", label: "آراء الناس" },
  { id: "location", label: "موقعنا" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="content-container flex h-18 items-center gap-3 md:gap-6">
        <span className="sr-only">شريط التنقل</span>

        <a href="#hero" aria-label="الرئيسية" className="logo-link">
          <Image
            src={restaurantConfig.logo}
            alt={`شعار ${restaurantConfig.name}`}
            width={64}
            height={64}
            className="logo-img"
          />
        </a>

        <div className="hidden flex-1 items-center justify-center gap-6 text-sm font-semibold md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="menu-btn ms-auto md:hidden"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? (
            <X size={20} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="mobile-navigation md:hidden">
          <div className="content-container flex flex-col gap-1 pb-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
