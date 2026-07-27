"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

type BreadcrumbHeaderProps = {
  title?: string;
  fallbackHref?: string;
  className?: string;
};

const PAGE_TITLES: Record<string, string> = {
  "/therapy": "All Therapies",
  "/therapies": "All Therapies",
  "/about": "About Us",
  "/contact": "Contact Us",
  "/gallery": "Gallery",
  "/events": "Events",
  "/departments": "All Departments",
  "/story": "Our Story",
  "/e-magazine": "E-Magazine",
};

function formatPathTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? "";

  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function BreadcrumbHeader({
  title,
  fallbackHref = "/",
  className = "",
}: BreadcrumbHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pageTitle =
    title ||
    PAGE_TITLES[pathname] ||
    formatPathTitle(pathname);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <div
      className={`relative flex h-[72px] mt-3 w-full items-center justify-center  bg-white px-4 ${className}`}
    >
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-[#111827] transition-colors duration-200 active:bg-black/5"
      >
        <ChevronLeft
          size={24}
          strokeWidth={2.4}
        />
      </button>

      <h1 className="max-w-[75%] truncate text-center text-[20px] font-bold leading-none tracking-[-0.5px] text-[#111827]">
        {pageTitle}
      </h1>
    </div>
  );
}