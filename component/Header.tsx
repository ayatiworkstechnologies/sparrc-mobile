"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full bg-white">
        <div className="flex h-[74px] items-center justify-between px-3 sm:px-5">
          {/* Logo */}
          <a href="/" className="relative block h-[48px] w-[74px]">
            <Image
              src="/images/logo.svg"
              alt="SPARRC Sports and Fitness Medicine Centre"
              fill
              priority
              className="object-contain object-left"
              sizes="74px"
            />
          </a>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition active:scale-95"
          >
            <Menu size={30} strokeWidth={2.2} className="text-black" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition ${
          isOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-full bg-white p-5 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="relative h-[48px] w-[74px]">
              <Image
                src="/images/logo.svg"
                alt="SPARRC logo"
                fill
                className="object-contain object-left"
                sizes="74px"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-6">
            <a href="/" className="text-lg font-light text-gray-900">
              Home
            </a>

            <a href="/about" className="text-lg font-light text-gray-900">
              About
            </a>

            <a
              href="/therapies"
              className="text-lg font-light text-gray-900"
            >
              Therapies
            </a>

            <a href="/contact" className="text-lg font-light text-gray-900">
              Contact
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
}