"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleAlert,
  Home,
  LoaderCircle,
  MessageCircle,
  Plus,
  Search,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
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

interface AppointmentFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type AppointmentStatus =
  | {
      type: "idle";
      message: "";
    }
  | {
      type: "submitting" | "error";
      message: string;
    };

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

/* ------------------------------------------------------------------ */
/* Therapy pages                                                      */
/* ------------------------------------------------------------------ */

const THERAPY_PAGES: TherapySearchItem[] = [
  {
    id: 1,
    name: "MTPT",
    description: "Myofascial Trigger Point Therapy",
    keywords: ["Trigger Point Therapy", "Myofascial Therapy"],
    href: "/therapy/mtpt",
  },
  {
    id: 2,
    name: "Prescription Exercise",
    description: "Exercise Prescription and Rehabilitation",
    keywords: ["Exercise Therapy", "Rehabilitation Exercise"],
    href: "/therapy/prescription-exercise",
  },
  {
    id: 3,
    name: "PEMF",
    description: "Pulsed Electromagnetic Field Therapy",
    keywords: ["Electromagnetic Therapy"],
    href: "/therapy/pemf",
  },
  {
    id: 4,
    name: "Sports Massage",
    description: "Sports Massage Therapy",
    keywords: ["Massage", "Recovery"],
    href: "/therapy/sports-massage",
  },
  {
    id: 5,
    name: "Physiotherapy",
    description: "Physiotherapy and Rehabilitation",
    keywords: ["Physical Therapy", "Rehabilitation"],
    href: "/therapy/physiotherapy",
  },
  {
    id: 6,
    name: "Aquatherapy",
    description: "Water-Based Rehabilitation Therapy",
    keywords: ["Aqua Therapy", "Hydrotherapy"],
    href: "/therapy/aquatherapy",
  },
  {
    id: 7,
    name: "Group Therapy",
    description: "Supervised Group Rehabilitation",
    keywords: ["Group Exercise"],
    href: "/therapy/group-therapy",
  },
  {
    id: 8,
    name: "Kalaripayattu",
    description: "Traditional Movement Therapy",
    keywords: ["Kalari Therapy"],
    href: "/therapy/kalaripayattu",
  },
  {
    id: 9,
    name: "Yoga Therapy",
    description: "Therapeutic Yoga and Rehabilitation",
    keywords: ["Yoga Rehabilitation"],
    href: "/therapy/yoga-therapy",
  },
  {
    id: 10,
    name: "Alternate Therapy",
    description: "Alternative Therapeutic Treatments",
    keywords: ["Alternative Therapy"],
    href: "/therapy/alternate-therapy",
  },
  {
    id: 11,
    name: "Functional Training",
    description: "Functional Strength and Mobility Training",
    keywords: ["Fitness Therapy", "Functional Exercise"],
    href: "/therapy/functional-training",
  },
  {
  id: 12,
  name: "Cranio Sacral Therapy",
  description: "Gentle manipulation of the craniosacral system",
  keywords: [
    "Cranio Sacral",
    "Craniosacral Therapy",
    "CST",
  ],
  href: "/therapy/cranio-sacral",
},
{
  id: 13,
  name: "Six Healing Sounds",
  description: "Breathing and sound practice for body relaxation",
  keywords: [
    "Healing Sounds",
    "Breathing Therapy",
    "Sound Therapy",
  ],
  href: "/therapy/six-healing-sounds",
},
];

/* ------------------------------------------------------------------ */
/* Search data                                                        */
/* ------------------------------------------------------------------ */

const SEARCHABLE_PAGES: SearchableItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Back to the homepage",
  },
  {
    title: "Therapy",
    href: "/therapy",
    description: "Browse all therapies",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about us",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch",
  },
];

const ALL_SEARCHABLE_ITEMS: SearchableItem[] = [
  ...SEARCHABLE_PAGES,
  ...THERAPY_PAGES.map((therapy) => ({
    title: therapy.name,
    href: therapy.href,
    description: therapy.description,
    keywords: therapy.keywords,
    category: "Therapy",
  })),
];

/* ------------------------------------------------------------------ */
/* Navigation data                                                    */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
  },
  {
    id: "therapy",
    label: "Therapy",
    icon: Plus,
    href: "/therapy",
  },
  {
    id: "about",
    label: "About",
    icon: UserRound,
    href: "/about",
  },
  {
    id: "contact",
    label: "Contact",
    icon: MessageCircle,
    href: "/contact",
  },
];

/* ------------------------------------------------------------------ */
/* Initial states                                                     */
/* ------------------------------------------------------------------ */

const INITIAL_FORM: AppointmentFormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const INITIAL_STATUS: AppointmentStatus = {
  type: "idle",
  message: "",
};

/* ------------------------------------------------------------------ */
/* Shared form styles                                                 */
/* ------------------------------------------------------------------ */

const LABEL_CLASS = `
  mb-1 block
  text-[10.5px]
  font-semibold
  leading-4
  text-[#46536a]
  sm:text-[11.5px]
`;

const INPUT_CLASS = `
  ios-no-zoom-field
  h-[40px]
  w-full
  rounded-[14px]
  border
  border-[#dce3ed]
  bg-[#f7f9fc]
  px-3
  text-[12px]
  text-[#273248]
  outline-none
  transition-all
  duration-200
  placeholder:text-[#a1afc4]
  focus:border-[#315df4]
  focus:bg-white
  focus:ring-[3px]
  focus:ring-[#315df4]/10
  disabled:cursor-not-allowed
  disabled:opacity-70
  sm:h-[43px]
  sm:text-[13px]
`;

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCurrentTherapy(pathname: string): string {
  const matchedTherapy = THERAPY_PAGES.find(
    (therapy) =>
      pathname === therapy.href ||
      pathname.startsWith(`${therapy.href}/`),
  );

  if (matchedTherapy) {
    return matchedTherapy.name;
  }

  const slug = pathname.split("/").filter(Boolean).at(-1);

  if (!slug) {
    return "General Therapy";
  }

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  return digits.length >= 7 && digits.length <= 15;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function BottomNav({
  footerId = "site-footer",
}: {
  footerId?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);

  const [form, setForm] =
    useState<AppointmentFormState>(INITIAL_FORM);

  const [status, setStatus] =
    useState<AppointmentStatus>(INITIAL_STATUS);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const NAV_CLEARANCE = 88;

  const isTherapyInnerPage =
    pathname.startsWith("/therapy/") &&
    pathname !== "/therapy";

  const currentTherapy = useMemo(
    () => getCurrentTherapy(pathname),
    [pathname],
  );

  /* ---------------------------------------------------------------- */
  /* Hide navigation near footer                                      */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const footer = document.getElementById(footerId);

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `0px 0px -${NAV_CLEARANCE}px 0px`,
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, [footerId]);

  useEffect(() => {
    const footer = document.getElementById(footerId);

    if (footer) {
      return;
    }

    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - NAV_CLEARANCE;

      setHidden(reachedBottom);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [footerId]);

  /* ---------------------------------------------------------------- */
  /* Lock body scrolling                                              */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const overlayOpen =
      searchOpen || appointmentOpen || successOpen;

    if (!overlayOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      if (searchOpen) {
        searchInputRef.current?.focus();
      }

      const isDesktop = window.matchMedia(
        "(min-width: 640px)",
      ).matches;

      if (appointmentOpen && isDesktop) {
        nameInputRef.current?.focus();
      }
    }, 180);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
    };
  }, [searchOpen, appointmentOpen, successOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
    }
  }, [searchOpen]);

  /* ---------------------------------------------------------------- */
  /* Escape key                                                       */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (!searchOpen && !appointmentOpen && !successOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (successOpen) {
        setSuccessOpen(false);
        return;
      }

      if (appointmentOpen && status.type !== "submitting") {
        setAppointmentOpen(false);
        return;
      }

      if (searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    searchOpen,
    appointmentOpen,
    successOpen,
    status.type,
  ]);

  /* ---------------------------------------------------------------- */
  /* Search                                                           */
  /* ---------------------------------------------------------------- */

  const trimmedQuery = query.trim().toLowerCase();

  const searchResults =
    trimmedQuery === ""
      ? []
      : ALL_SEARCHABLE_ITEMS.filter((item) => {
          const titleMatches = item.title
            .toLowerCase()
            .includes(trimmedQuery);

          const descriptionMatches = item.description
            .toLowerCase()
            .includes(trimmedQuery);

          const keywordMatches = item.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(trimmedQuery),
          );

          return (
            titleMatches ||
            descriptionMatches ||
            Boolean(keywordMatches)
          );
        });

  const goTo = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  /* ---------------------------------------------------------------- */
  /* Active navigation                                                */
  /* ---------------------------------------------------------------- */

  const isItemActive = (item: NavItem) => {
    if (item.id === "search") {
      return searchOpen;
    }

    if (item.id === "home") {
      return pathname === "/";
    }

    if (item.id === "therapy") {
      return (
        pathname === "/therapy" ||
        pathname === "/therapy" ||
        pathname.startsWith("/therapy/") ||
        pathname.startsWith("/therapy/")
      );
    }

    if (!item.href) {
      return false;
    }

    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );
  };

  /* ---------------------------------------------------------------- */
  /* Appointment handlers                                             */
  /* ---------------------------------------------------------------- */

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/therapy");
  };

  const openAppointment = () => {
    setStatus(INITIAL_STATUS);
    setAppointmentOpen(true);
  };

  const closeAppointment = () => {
    if (status.type === "submitting") {
      return;
    }

    setAppointmentOpen(false);
  };

  const handleInput = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (status.type === "error") {
      setStatus(INITIAL_STATUS);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !phone || !email || !message) {
      setStatus({
        type: "error",
        message: "Please complete all fields before submitting.",
      });

      return;
    }

    if (!isValidPhone(phone)) {
      setStatus({
        type: "error",
        message: "Please enter a valid phone number.",
      });

      return;
    }

    if (!isValidEmail(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });

      return;
    }

    setStatus({
      type: "submitting",
      message: "Submitting your appointment...",
    });

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          therapy: currentTherapy,
          message,
        }),
      });

      const responseData = (await response
        .json()
        .catch(() => null)) as
        | {
            success?: boolean;
            message?: string;
          }
        | null;

      if (!response.ok || !responseData?.success) {
        throw new Error(
          responseData?.message ??
            "Unable to submit your appointment. Please try again.",
        );
      }

      setForm(INITIAL_FORM);
      setStatus(INITIAL_STATUS);
      setAppointmentOpen(false);

      window.setTimeout(() => {
        setSuccessOpen(true);
      }, 180);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your appointment. Please try again.",
      });
    }
  };

  return (
    <>
      {/* iOS Safari prevents automatic focus zoom for fields under 16px. */}
      <style>{`
        @supports (-webkit-touch-callout: none) {
          input.ios-no-zoom-field,
          textarea.ios-no-zoom-field {
            font-size: 16px !important;
          }
        }
      `}</style>

      {/* ============================================================ */}
      {/* Therapy inner page action menu                               */}
      {/* ============================================================ */}

      {isTherapyInnerPage ? (
        <motion.nav
          aria-label="Therapy page actions"
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: hidden ? 95 : 0,
            opacity: hidden ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          style={{
            pointerEvents: hidden ? "none" : "auto",
          }}
          className="
            fixed
            inset-x-2
            bottom-3
            z-[999]
            isolate
            mx-auto
            grid
            h-[60px]
            max-w-[500px]
            grid-cols-[0.82fr_1.7fr]
            items-center
            gap-2
            rounded-full
            border
            border-neutral-200/90
            bg-white/95
            p-[5px]
            shadow-[0_10px_28px_rgba(15,23,42,0.13)]
            backdrop-blur-xl
          "
        >
          <motion.button
            type="button"
            onClick={handleBack}
            whileTap={{
              scale: 0.96,
            }}
            className="
              flex
              h-full
              min-w-0
              items-center
              justify-center
              gap-1.5
              rounded-full
              border
              border-neutral-200
              bg-white
              px-3
              text-[12px]
              font-semibold
              text-[#344054]
              shadow-[0_2px_8px_rgba(15,23,42,0.04)]
              transition-colors
              hover:bg-neutral-50
            "
          >
            <ArrowLeft
              className="h-[17px] w-[17px] shrink-0"
              strokeWidth={2.2}
            />

            <span>Back</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={openAppointment}
            whileTap={{
              scale: 0.97,
            }}
            className="
              flex
              h-full
              min-w-0
              items-center
              justify-center
              gap-2
              rounded-full
              bg-gradient-to-r
              from-[#0d99ef]
              via-[#1765df]
              to-[#2524b9]
              px-3
              text-[12px]
              font-semibold
              text-white
              shadow-[0_7px_18px_rgba(33,48,190,0.26)]
            "
          >
            <CalendarDays
              className="h-[17px] w-[17px] shrink-0"
              strokeWidth={2.1}
            />

            <span className="truncate">
              Book Appointment
            </span>
          </motion.button>
        </motion.nav>
      ) : (
        /* ========================================================== */
        /* Correct compact curved navigation                          */
        /* ========================================================== */

        <motion.nav
          aria-label="Primary navigation"
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: hidden ? 95 : 0,
            opacity: hidden ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          style={{
            pointerEvents: hidden ? "none" : "auto",
          }}
          className="
            fixed
            inset-x-2
            bottom-3
            z-[999]
            isolate
            mx-auto
            flex
            h-[62px]
            max-w-[470px]
            items-center
            justify-around
            rounded-full
            border
            border-neutral-200/90
            bg-white/95
            px-2
            shadow-[0_10px_28px_rgba(15,23,42,0.13)]
            backdrop-blur-xl
          "
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);

            const navContent = (
              <>
                <motion.span
                  animate={{
                    scale: isActive ? 1 : 0.96,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 24,
                  }}
                  className={`
                    flex
                    items-center
                    justify-center
                    rounded-[10px]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? `
                          h-[36px]
                          w-[36px]
                          bg-gradient-to-b
                          from-[#078ce8]
                          via-[#075ecc]
                          to-[#210393]
                          text-white
                          shadow-[0_6px_15px_rgba(33,3,147,0.25)]
                        `
                        : `
                          h-[27px]
                          w-[27px]
                          bg-transparent
                          text-[#788398]
                        `
                    }
                  `}
                >
                  <Icon
                    strokeWidth={isActive ? 2.2 : 1.9}
                    className={
                      isActive
                        ? "h-[19px] w-[19px]"
                        : "h-[18px] w-[18px]"
                    }
                  />
                </motion.span>

                <span
                  className={`
                    text-[10.5px]
                    leading-none
                    tracking-tight
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "font-semibold text-[#101828]"
                        : "font-normal text-[#8994a8]"
                    }
                  `}
                >
                  {item.label}
                </span>
              </>
            );

            if (item.id === "search") {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  aria-current={isActive ? "page" : undefined}
                  className="
                    flex
                    min-w-[54px]
                    flex-col
                    items-center
                    justify-center
                    gap-[2px]
                  "
                >
                  {navContent}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href ?? "#"}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="
                  flex
                  min-w-[54px]
                  flex-col
                  items-center
                  justify-center
                  gap-[2px]
                "
              >
                {navContent}
              </Link>
            );
          })}
        </motion.nav>
      )}

      {/* ============================================================ */}
      {/* Centred appointment modal                                    */}
      {/* ============================================================ */}

      <AnimatePresence>
        {appointmentOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-dialog-title"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeAppointment();
              }
            }}
            className="
              fixed
              inset-0
              z-[1100]
              flex
              min-h-[100dvh]
              items-center
              justify-center
              overflow-y-auto
              bg-[#172033]/30
              px-2.5
              pb-[82px]
              pt-[65px]
              backdrop-blur-[3px]
              sm:px-5
              sm:py-8
            "
          >
            <motion.section
              initial={{
                y: 24,
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                y: 18,
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
              }}
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
              className="
                relative
                my-auto
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[20px]
                border
                border-white/90
                bg-white
                shadow-[0_24px_70px_rgba(15,23,42,0.26)]
              "
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="
                  max-h-[calc(100dvh-148px)]
                  overflow-y-auto
                  overscroll-contain
                  px-3.5
                  py-3.5
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                  sm:max-h-[calc(100dvh-64px)]
                  sm:px-5
                  sm:py-5
                "
              >
                {/* Header */}

                <motion.div
                  initial={{
                    y: 8,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.05,
                  }}
                  className="relative pr-10"
                >
                  <h2
                    id="appointment-dialog-title"
                    className="
                      text-[18px]
                      font-bold
                      leading-[1.2]
                      tracking-[-0.02em]
                      text-[#121826]
                      sm:text-[20px]
                    "
                  >
                    Book an Appointment
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[10.5px]
                      leading-4
                      text-[#8b9ab1]
                      sm:text-[12px]
                    "
                  >
                    Our representative will get back to you shortly.
                  </p>

                  <button
                    type="button"
                    onClick={closeAppointment}
                    disabled={status.type === "submitting"}
                    aria-label="Close appointment form"
                    className="
                      absolute
                      right-0
                      top-[-3px]
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#e2e7ef]
                      bg-white
                      text-[#727d8e]
                      shadow-[0_4px_12px_rgba(15,23,42,0.08)]
                      transition
                      hover:border-[#cdd5e1]
                      hover:text-[#111827]
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <X
                      className="h-[17px] w-[17px]"
                      strokeWidth={2}
                    />
                  </button>
                </motion.div>

                {/* Therapy badge */}

                <motion.div
                  initial={{
                    y: 7,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.08,
                  }}
                  className="mt-2"
                >
                  <span
                    className="
                      inline-flex
                      h-[23px]
                      items-center
                      rounded-full
                      border
                      border-[#dce7ff]
                      bg-[#eef4ff]
                      px-2.5
                      text-[10px]
                      font-semibold
                      text-[#2854d8]
                    "
                  >
                    {currentTherapy}
                  </span>
                </motion.div>

                {/* Form fields */}

                <div className="mt-3 space-y-2.5">
                  <motion.div
                    initial={{
                      y: 8,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.11,
                    }}
                  >
                    <label
                      htmlFor="appointment-name"
                      className={LABEL_CLASS}
                    >
                      Name
                    </label>

                    <input
                      ref={nameInputRef}
                      id="appointment-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleInput}
                      autoComplete="name"
                      placeholder="Enter your full name"
                      disabled={status.type === "submitting"}
                      className={INPUT_CLASS}
                    />
                  </motion.div>

                  <motion.div
                    initial={{
                      y: 8,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.14,
                    }}
                  >
                    <label
                      htmlFor="appointment-phone"
                      className={LABEL_CLASS}
                    >
                      Phone Number
                    </label>

                    <input
                      id="appointment-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={handleInput}
                      autoComplete="tel"
                      placeholder="e.g. +91 98765 43210"
                      disabled={status.type === "submitting"}
                      className={INPUT_CLASS}
                    />
                  </motion.div>

                  <motion.div
                    initial={{
                      y: 8,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.17,
                    }}
                  >
                    <label
                      htmlFor="appointment-email"
                      className={LABEL_CLASS}
                    >
                      Email Address
                    </label>

                    <input
                      id="appointment-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      value={form.email}
                      onChange={handleInput}
                      autoComplete="email"
                      placeholder="e.g. name@domain.com"
                      disabled={status.type === "submitting"}
                      className={INPUT_CLASS}
                    />
                  </motion.div>

                  <motion.div
                    initial={{
                      y: 8,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                  >
                    <label
                      htmlFor="appointment-message"
                      className={LABEL_CLASS}
                    >
                      Message
                    </label>

                    <textarea
                      id="appointment-message"
                      name="message"
                      value={form.message}
                      onChange={handleInput}
                      placeholder="How can we help with your therapy?"
                      rows={3}
                      disabled={status.type === "submitting"}
                      className="
                        ios-no-zoom-field
                        min-h-[72px]
                        w-full
                        resize-none
                        rounded-[14px]
                        border
                        border-[#dce3ed]
                        bg-[#f7f9fc]
                        px-3
                        py-2.5
                        text-[12px]
                        leading-[18px]
                        text-[#273248]
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-[#a1afc4]
                        focus:border-[#315df4]
                        focus:bg-white
                        focus:ring-[3px]
                        focus:ring-[#315df4]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                        sm:min-h-[82px]
                        sm:text-[13px]
                      "
                    />
                  </motion.div>
                </div>

                {/* Error */}

                <AnimatePresence mode="wait">
                  {status.type === "error" && (
                    <motion.div
                      key="appointment-error"
                      role="alert"
                      initial={{
                        y: 5,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: -4,
                        opacity: 0,
                      }}
                      className="
                        mt-2.5
                        flex
                        items-start
                        gap-2
                        rounded-[10px]
                        border
                        border-red-100
                        bg-red-50
                        px-2.5
                        py-2
                        text-[10.5px]
                        leading-4
                        text-red-700
                      "
                    >
                      <CircleAlert
                        className="
                          mt-px
                          h-3.5
                          w-3.5
                          shrink-0
                        "
                      />

                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}

                <motion.button
                  type="submit"
                  disabled={status.type === "submitting"}
                  initial={{
                    y: 8,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.23,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className="
                    mt-3.5
                    flex
                    h-[42px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-gradient-to-r
                    from-[#1449df]
                    via-[#123bd0]
                    to-[#1d28ba]
                    px-4
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-[0_8px_20px_rgba(29,40,186,0.22)]
                    transition
                    hover:brightness-105
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    sm:h-[46px]
                    sm:text-[13px]
                  "
                >
                  {status.type === "submitting" ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CalendarDays className="h-4 w-4" />
                      <span>Submit Appointment</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* Success screen                                               */}
      {/* ============================================================ */}

      <AnimatePresence>
        {successOpen && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-0
              z-[1200]
              overflow-hidden
              bg-white
            "
          >
            <motion.button
              type="button"
              onClick={() => setSuccessOpen(false)}
              initial={{
                x: -22,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.16,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              whileTap={{
                scale: 0.9,
              }}
              aria-label="Back to therapy page"
              className="
                absolute
                left-5
                top-[max(26px,env(safe-area-inset-top))]
                z-10
                flex
                h-[48px]
                w-[48px]
                items-center
                justify-center
                rounded-full
                border
                border-[#e3e8f1]
                bg-white
                text-[#1e293b]
                shadow-[0_8px_24px_rgba(15,23,42,0.12)]
              "
            >
              <ArrowLeft className="h-6 w-6" />
            </motion.button>

            <div
              className="
                flex
                min-h-[100dvh]
                flex-col
                items-center
                justify-center
                px-6
                pb-16
              "
            >
              <div
                className="
                  relative
                  flex
                  h-[150px]
                  w-[150px]
                  items-center
                  justify-center
                "
              >
                {Array.from({
                  length: 12,
                }).map((_, index) => {
                  const angle =
                    (index / 12) * Math.PI * 2;

                  const x = Math.cos(angle) * 55;
                  const y = Math.sin(angle) * 55;

                  return (
                    <motion.span
                      key={index}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x,
                        y,
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 0.65],
                      }}
                      transition={{
                        delay: 0.18 + index * 0.035,
                        duration: 0.55,
                        ease: "easeOut",
                      }}
                      className="
                        absolute
                        h-[7px]
                        w-[7px]
                        rounded-full
                        bg-[#e1e5eb]
                      "
                    />
                  );
                })}

                <motion.div
                  initial={{
                    scale: 0,
                    rotate: -20,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 17,
                    delay: 0.12,
                  }}
                  className="
                    relative
                    flex
                    h-[78px]
                    w-[78px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-br
                    from-[#06a8ef]
                    via-[#1559d7]
                    to-[#2700a8]
                    shadow-[0_12px_32px_rgba(32,50,190,0.3)]
                  "
                >
                  <motion.div
                    initial={{
                      scale: 0.6,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.42,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                  >
                    <Check
                      className="h-11 w-11 text-white"
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  <motion.span
                    initial={{
                      x: -100,
                      opacity: 0,
                    }}
                    animate={{
                      x: 110,
                      opacity: [0, 0.45, 0],
                    }}
                    transition={{
                      delay: 0.55,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute
                      inset-y-0
                      w-8
                      rotate-12
                      bg-white/40
                      blur-md
                    "
                  />
                </motion.div>
              </div>

              <motion.h2
                initial={{
                  y: 24,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.45,
                }}
                className="
                  mt-10
                  max-w-[360px]
                  text-center
                  text-[27px]
                  font-bold
                  leading-[1.28]
                  tracking-[-0.03em]
                  text-black
                "
              >
                Your appointment has been
                <br />
                successfully submitted.
              </motion.h2>

              <motion.p
                initial={{
                  y: 18,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.72,
                  duration: 0.4,
                }}
                className="
                  mt-4
                  max-w-[320px]
                  text-center
                  text-[14px]
                  leading-6
                  text-[#8793a8]
                "
              >
                Your enquiry for{" "}
                <strong className="font-semibold text-[#1839cc]">
                  {currentTherapy}
                </strong>{" "}
                has been received. Our representative will contact you
                shortly.
              </motion.p>

              <motion.button
                type="button"
                onClick={() => setSuccessOpen(false)}
                initial={{
                  y: 18,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.84,
                  duration: 0.4,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  mt-8
                  flex
                  h-[48px]
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-[#dce3ee]
                  bg-white
                  px-6
                  text-[14px]
                  font-semibold
                  text-[#26344d]
                  shadow-[0_8px_22px_rgba(15,23,42,0.08)]
                "
              >
                <ArrowLeft className="h-[18px] w-[18px]" />

                <span>Back to Therapy</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* Search overlay                                               */}
      {/* ============================================================ */}

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              fixed
              inset-0
              z-[1000]
              flex
              flex-col
              bg-white
            "
          >
            <motion.div
              initial={{
                y: -16,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.05,
                duration: 0.25,
              }}
              className="
                flex
                items-center
                gap-3
                border-b
                border-neutral-100
                px-4
                py-4
              "
            >
              <Search className="h-5 w-5 text-neutral-400" />

              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                placeholder="Search therapies, pages, or keywords..."
                className="
                  ios-no-zoom-field
                  min-w-0
                  flex-1
                  bg-transparent
                  text-base
                  text-neutral-900
                  outline-none
                  placeholder:text-neutral-400
                "
              />

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="
                  text-sm
                  font-medium
                  text-neutral-500
                  transition-colors
                  hover:text-neutral-900
                "
              >
                Cancel
              </button>
            </motion.div>

            <div
              className="
                flex-1
                overflow-y-auto
                px-4
                py-2
              "
            >
              {trimmedQuery === "" ? (
                <p className="mt-12 text-center text-sm text-neutral-400">
                  Type to search pages and therapy services...
                </p>
              ) : searchResults.length === 0 ? (
                <p className="mt-12 text-center text-sm text-neutral-400">
                  No matches found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                searchResults.map((item, index) => (
                  <motion.button
                    key={item.href}
                    type="button"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.03,
                    }}
                    onClick={() => goTo(item.href)}
                    className="
                      flex
                      w-full
                      flex-col
                      items-start
                      gap-1
                      rounded-lg
                      border-b
                      border-neutral-100
                      px-2
                      py-3
                      text-left
                      transition-colors
                      hover:bg-neutral-50/80
                    "
                  >
                    <div
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <span className="text-[15px] font-semibold text-neutral-900">
                        {item.title}
                      </span>

                      {item.category && (
                        <span
                          className="
                            shrink-0
                            rounded-full
                            bg-blue-50
                            px-2
                            py-0.5
                            text-[11px]
                            font-medium
                            tracking-wide
                            text-blue-600
                          "
                        >
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