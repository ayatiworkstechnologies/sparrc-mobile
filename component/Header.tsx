"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Therapies",
    href: "/therapy",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  /* Close menu when route changes */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* Lock background scroll */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close menu using Escape key */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed left-0 top-0 z-50 w-full bg-white">
        <div className="flex h-[74px] items-center justify-between px-3 sm:px-5">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to SPARRC homepage"
            className="
              relative
              block
              h-[48px]
              w-[74px]
              shrink-0
              touch-manipulation
              [-webkit-tap-highlight-color:transparent]
            "
          >
            <Image
              src="/images/logo.svg"
              alt="SPARRC Sports and Fitness Medicine Centre"
              fill
              priority
              sizes="74px"
              className="object-contain object-left"
            />
          </Link>

          {/* Open menu */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="
              flex
              h-[48px]
              w-[48px]
              shrink-0
              touch-manipulation
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#111827]
              shadow-[0_8px_24px_rgba(0,0,0,0.06)]
              transition
              duration-200
              active:scale-95
              [-webkit-tap-highlight-color:transparent]
            "
          >
            <Menu
              size={29}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={`
          fixed
          inset-0
          z-[1000]
          transition-[visibility]
          duration-300
          ${
            isOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }
        `}
      >
        {/* Background overlay */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={isOpen ? 0 : -1}
          className={`
            absolute
            inset-0
            h-full
            w-full
            bg-black/25
            transition-opacity
            duration-300
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Menu panel */}
        <aside
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!isOpen}
          style={{
            paddingTop: "max(20px, env(safe-area-inset-top))",
            paddingBottom: "max(20px, env(safe-area-inset-bottom))",
          }}
          className={`
            absolute
            right-0
            top-0
            z-10
            h-[100dvh]
            w-full
            overflow-y-auto
            bg-white
            px-5
            shadow-2xl
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isOpen
                ? "translate-x-0"
                : "translate-x-full"
            }
          `}
        >
          {/* Menu header */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              aria-label="Go to SPARRC homepage"
              className="
                relative
                block
                h-[58px]
                w-[108px]
                shrink-0
                touch-manipulation
                [-webkit-tap-highlight-color:transparent]
              "
            >
              <Image
                src="/images/logo.svg"
                alt="SPARRC Sports and Fitness Medicine Centre"
                fill
                priority
                sizes="108px"
                className="object-contain object-left"
              />
            </Link>

            {/* iPhone-safe close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="
                relative
                z-20
                flex
                h-[48px]
                w-[48px]
                shrink-0
                touch-manipulation
                items-center
                justify-center
                rounded-full
                border
                border-[#e7ebf1]
                bg-[#f7f8fa]
                shadow-[0_5px_16px_rgba(15,23,42,0.06)]
                transition
                duration-200
                active:scale-95
                [-webkit-tap-highlight-color:transparent]
              "
            >
              <span
                aria-hidden="true"
                className="relative block h-[23px] w-[23px]"
              >
                <span
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[2.5px]
                    w-[24px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45
                    rounded-full
                    bg-[#111827]
                  "
                />

                <span
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[2.5px]
                    w-[24px]
                    -translate-x-1/2
                    -translate-y-1/2
                    -rotate-45
                    rounded-full
                    bg-[#111827]
                  "
                />
              </span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-7 flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => {
              const isActive = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    transitionDelay: isOpen
                      ? `${70 + index * 45}ms`
                      : "0ms",
                  }}
                  className={`
                    relative
                    flex
                    min-h-[58px]
                    touch-manipulation
                    items-center
                    rounded-[14px]
                    px-3
                    text-[21px]
                    leading-none
                    tracking-[-0.3px]
                    transition-all
                    duration-500
                    [-webkit-tap-highlight-color:transparent]
                    ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-5 opacity-0"
                    }
                    ${
                      isActive
                        ? "font-medium text-[#1464d2]"
                        : "font-normal text-[#172033] hover:bg-[#f5f8ff] hover:text-[#1464d2]"
                    }
                  `}
                >
                  {/* Active blue line */}
                  <span
                    aria-hidden="true"
                    className={`
                      mr-3
                      h-[24px]
                      w-[3px]
                      shrink-0
                      rounded-full
                      bg-[#1464d2]
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "scale-y-100 opacity-100"
                          : "scale-y-50 opacity-0"
                      }
                    `}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}