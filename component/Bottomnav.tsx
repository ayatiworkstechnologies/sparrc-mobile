"use client";

import { useEffect, useRef, useState, type ReactElement, type SVGProps } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & Interfaces                                                */
/* ------------------------------------------------------------------ */

interface TherapySearchItem {
  id: number;
  name: string;
  description: string;
  keywords: string[];
  href: string;
}

interface SearchableItem {
  title: string;
  href: string;
  description: string;
  keywords?: string[];
  category?: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const therapyPages: TherapySearchItem[] = [
  {
    id: 1,
    name: "MTPT",
    description: "Myofascial Trigger Point Therapy",
    keywords: ["Trigger Point Therapy", "Myofascial Therapy"],
    href: "/therapies/mtpt",
  },
  {
    id: 2,
    name: "Prescription Exercise",
    description: "Exercise Prescription and Rehabilitation",
    keywords: ["Exercise Therapy", "Rehabilitation Exercise"],
    href: "/therapies/prescription-exercise",
  },
  {
    id: 3,
    name: "PEMF",
    description: "Pulsed Electromagnetic Field Therapy",
    keywords: ["Electromagnetic Therapy"],
    href: "/therapies/pemf",
  },
  {
    id: 4,
    name: "Sports Massage",
    description: "Sports Massage Therapy",
    keywords: ["Massage", "Recovery"],
    href: "/therapies/sports-massage",
  },
  {
    id: 5,
    name: "Physiotherapy",
    description: "Physiotherapy and Rehabilitation",
    keywords: ["Physical Therapy", "Rehabilitation"],
    href: "/therapies/physiotherapy",
  },
  {
    id: 6,
    name: "Aquatherapy",
    description: "Water-Based Rehabilitation Therapy",
    keywords: ["Aqua Therapy", "Hydrotherapy"],
    href: "/therapies/aquatherapy",
  },
  {
    id: 7,
    name: "Group Therapy",
    description: "Supervised Group Rehabilitation",
    keywords: ["Group Exercise"],
    href: "/therapies/group-therapy",
  },
  {
    id: 8,
    name: "Kalaripayattu",
    description: "Traditional Movement Therapy",
    keywords: ["Kalari Therapy"],
    href: "/therapies/kalaripayattu",
  },
  {
    id: 9,
    name: "Yoga Therapy",
    description: "Therapeutic Yoga and Rehabilitation",
    keywords: ["Yoga Rehabilitation"],
    href: "/therapies/yoga-therapy",
  },
  {
    id: 10,
    name: "Alternate Therapy",
    description: "Alternative Therapeutic Treatments",
    keywords: ["Alternative Therapy"],
    href: "/therapies/alternate-therapy",
  },
  {
    id: 11,
    name: "Functional Training",
    description: "Functional Strength and Mobility Training",
    keywords: ["Fitness Therapy", "Functional Exercise"],
    href: "/therapies/functional-training",
  },
];

const SEARCHABLE_PAGES: SearchableItem[] = [
  { title: "Home", href: "/", description: "Back to the homepage", category: "" },
  { title: "Therapy", href: "/theraphy", description: "Browse all therapies", category: "" },
  { title: "About", href: "/about", description: "Learn more about us", category: "" },
  { title: "Contact", href: "/contact", description: "Get in touch", category: "" },
];

const ALL_SEARCHABLE_ITEMS: SearchableItem[] = [
  ...SEARCHABLE_PAGES,
  ...therapyPages.map((item) => ({
    title: item.name,
    href: item.href,
    description: item.description,
    keywords: item.keywords,
    category: "Therapy",
  })),
];

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

type IconProps = SVGProps<SVGSVGElement>;

function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.832 2.849" />
    </svg>
  );
}

function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="14" rx="3" />
      <path d="M7 20l4-2h10" />
      <circle cx="8" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="16" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav Item Configuration                                            */
/* ------------------------------------------------------------------ */

interface NavItem {
  id: string;
  label: string;
  icon: (props: IconProps) => ReactElement;
  href?: string;
  isCenter?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: HomeIcon, href: "/" },
  { id: "search", label: "Search", icon: SearchIcon },
  { id: "theraphy", label: "Theraphy", icon: PlusIcon, href: "/theraphy", isCenter: true },
  { id: "about", label: "About", icon: UserIcon, href: "/about" },
  { id: "contact", label: "contact", icon: ChatIcon, href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BottomNav({ footerId = "site-footer" }: { footerId?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const NAV_CLEARANCE = 100;

  useEffect(() => {
    const footer = document.getElementById(footerId);
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      root: null,
      threshold: 0,
      rootMargin: `0px 0px -${NAV_CLEARANCE}px 0px`,
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [footerId]);

  useEffect(() => {
    const footer = document.getElementById(footerId);
    if (footer) return;

    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - NAV_CLEARANCE;
      setHidden(scrolledToBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [footerId]);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      searchInputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  // Search logic
  const trimmedQuery = query.trim().toLowerCase();
  const results = trimmedQuery === ""
    ? []
    : ALL_SEARCHABLE_ITEMS.filter((item) => {
        const matchTitle = item.title.toLowerCase().includes(trimmedQuery);
        const matchDescription = item.description.toLowerCase().includes(trimmedQuery);
        const matchKeywords = item.keywords?.some((kw) => kw.toLowerCase().includes(trimmedQuery));
        return matchTitle || matchDescription || matchKeywords;
      });

  const goTo = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Bottom Nav Container */}
      <motion.nav
        aria-label="Primary"
        animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{ pointerEvents: hidden ? "none" : "auto" }}
        className="fixed inset-x-4 bottom-5 z-[999] isolate mx-auto flex h-[76px] max-w-md items-center justify-around rounded-full bg-white px-3 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100/60"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          // Center Plus Button ("Theraphy")
          if (item.isCenter) {
            // Active if exact match OR if navigating any sub-page of /therapies
            const isActive = item.href 
              ? pathname === item.href || pathname.startsWith("/therapies") || pathname.startsWith("/theraphy")
              : false;

            return (
              <Link
                key={item.id}
                href={item.href ?? "#"}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-col items-center gap-1"
              >
                <motion.span
                  whileTap={{ scale: 0.94 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-b from-[#0086DC] to-[#210393] shadow-sm"
                >
                  <Icon className="h-5 w-5 text-white" />
                </motion.span>
                <span className={`text-[13px] tracking-tight ${isActive ? "font-bold text-black" : "font-normal text-gray-400"}`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          // Search Button Trigger
          if (item.id === "search") {
            const isActive = searchOpen;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="flex flex-col items-center gap-1.5 px-2"
              >
                <Icon className={`h-5 w-5 stroke-[2.2] ${isActive ? "text-black" : "text-gray-500"}`} />
                <span className={`text-[13px] ${isActive ? "font-bold text-black" : "font-normal text-gray-400"}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          // Regular Nav Links (Home, About, Contact)
          const isActive = item.href ? pathname === item.href : false;

          return (
            <Link
              key={item.id}
              href={item.href ?? "#"}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center gap-1.5 px-2"
            >
              <Icon className={`h-5 w-5 stroke-[2] ${isActive ? "text-black" : "text-gray-500"}`} />
              <span className={`text-[13px] ${isActive ? "font-bold text-black" : "font-normal text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </motion.nav>

      {/* Full-screen search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-white"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="flex items-center gap-3 border-b border-neutral-100 px-4 py-4"
            >
              <SearchIcon className="h-5 w-5 text-neutral-400" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search therapies, pages, or keywords..."
                className="flex-1 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
            </motion.div>

            <div className="flex-1 overflow-y-auto px-4 py-2">
              {trimmedQuery === "" ? (
                <p className="mt-12 text-center text-sm text-neutral-400">
                  Type to search pages and therapy services...
                </p>
              ) : results.length === 0 ? (
                <p className="mt-12 text-center text-sm text-neutral-400">
                  No matches found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                results.map((item, i) => (
                  <motion.button
                    key={item.href}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => goTo(item.href)}
                    className="flex w-full flex-col items-start gap-1 border-b border-neutral-100 py-3 text-left hover:bg-neutral-50/80 transition-colors px-2 rounded-lg"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-[15px] font-semibold text-neutral-900">
                        {item.title}
                      </span>
                      {item.category && (
                        <span className="text-[11px] font-medium tracking-wide text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <span className="text-[13px] text-neutral-500">
                      {item.description}
                    </span>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}