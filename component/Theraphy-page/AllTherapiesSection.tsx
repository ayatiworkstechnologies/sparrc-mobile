"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Check,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type TherapyCategory =
  | "All"
  | "Physical"
  | "Sports"
  | "Alternate"
  | "Wellness"
  | "Rehab";

type SortOption =
  | "Recommended"
  | "Highest Rated"
  | "Name A-Z"
  | "Name Z-A";

type TherapyItem = {
  id: number;
  title: string;
  category: Exclude<TherapyCategory, "All">;
  rating: number;
  description: string;
  image: string;
  href: string;
  keywords?: string[];
};

/* ------------------------------------------------------------------ */
/* Filters                                                             */
/* ------------------------------------------------------------------ */

const CATEGORIES: TherapyCategory[] = [
  "All",
  "Physical",
  "Sports",
  "Alternate",
  "Wellness",
  "Rehab",
];

const RATINGS = [0, 4, 4.5, 4.8];

const SORT_OPTIONS: SortOption[] = [
  "Recommended",
  "Highest Rated",
  "Name A-Z",
  "Name Z-A",
];

/* ------------------------------------------------------------------ */
/* Therapy data                                                        */
/* ------------------------------------------------------------------ */

const THERAPIES: TherapyItem[] = [
  {
    id: 1,
    title: "Myofascial TPT",
    category: "Physical",
    rating: 4.9,
    description:
      "Trigger point therapy to relieve chronic muscle pain",
    image: "/images/mtpt-01.png",
    href: "/therapy/mtpt",
    keywords: [
      "MTPT",
      "myofascial",
      "trigger point",
      "muscle pain",
    ],
  },
  {
    id: 2,
    title: "PEMF Therapy",
    category: "Alternate",
    rating: 4.8,
    description:
      "Pulsed electromagnetic field therapy for healing",
    image: "/images/pemf-01.png",
    href: "/therapy/pemf",
    keywords: [
      "PEMF",
      "electromagnetic",
      "healing",
      "alternate therapy",
    ],
  },
  {
    id: 3,
    title: "Physiotherapy",
    category: "Physical",
    rating: 4.7,
    description:
      "Core physical therapy for movement restoration",
    image: "/images/physiotherapy-01.png",
    href: "/therapy/physiotherapy",
    keywords: [
      "physical therapy",
      "movement",
      "rehabilitation",
    ],
  },
  {
    id: 4,
    title: "Group Therapy",
    category: "Rehab",
    rating: 4.8,
    description:
      "Therapeutic exercises in a supervised group setting",
    image: "/images/group-therapy-01.png",
    href: "/therapy/group-therapy",
    keywords: [
      "group exercise",
      "rehabilitation",
      "supervised therapy",
    ],
  },
  {
    id: 5,
    title: "Yoga Therapy",
    category: "Wellness",
    rating: 4.6,
    description:
      "Yoga-based interventions for rehab and wellness",
    image: "/images/yoga-therapy-01.png",
    href: "/therapy/yoga-therapy",
    keywords: ["yoga", "wellness", "rehabilitation"],
  },
  {
    id: 6,
    title: "Functional Training",
    category: "Sports",
    rating: 4.9,
    description:
      "Improving movement patterns for daily life",
    image: "/images/functional-training-01.png",
    href: "/therapy/functional-training",
    keywords: [
      "fitness",
      "movement",
      "strength",
      "mobility",
    ],
  },
  {
    id: 7,
    title: "Prescription Exercise",
    category: "Physical",
    rating: 4.7,
    description:
      "Tailor-made exercise plans for specific conditions",
    image: "/images/prescription-exercise-01.png",
    href: "/therapy/prescription-exercise",
    keywords: [
      "exercise",
      "prescription",
      "fitness",
      "rehabilitation",
    ],
  },
  {
    id: 8,
    title: "Sports Massage",
    category: "Sports",
    rating: 4.6,
    description:
      "Massage therapy for athletes and sportspersons",
    image: "/images/sports-massage-01.png",
    href: "/therapy/sports-massage",
    keywords: [
      "sports",
      "massage",
      "recovery",
      "athlete",
    ],
  },
  {
    id: 9,
    title: "Aquatherapy",
    category: "Rehab",
    rating: 4.9,
    description:
      "Water-based therapeutic exercises for recovery",
    image: "/images/aquatherapy-01.png",
    href: "/therapy/aquatherapy",
    keywords: [
      "aqua therapy",
      "hydrotherapy",
      "water therapy",
      "recovery",
    ],
  },
  {
    id: 10,
    title: "Kalaripayattu",
    category: "Alternate",
    rating: 4.8,
    description:
      "Ancient Indian martial art as therapeutic movement",
    image: "/images/kalaripayattu-01.png",
    href: "/therapy/kalaripayattu",
    keywords: [
      "kalari",
      "martial art",
      "traditional therapy",
      "movement",
    ],
  },
  {
    id: 11,
    title: "Cranio Sacral Therapy",
    category: "Alternate",
    rating: 4.7,
    description:
      "Gentle manipulation of the craniosacral system",
    image: "/images/cranio-sacral-01.png",
    href: "/therapy/cranio-sacral",
    keywords: [
      "craniosacral",
      "relaxation",
      "alternate therapy",
    ],
  },
  {
    id: 12,
    title: "Six Healing Sounds",
    category: "Wellness",
    rating: 4.6,
    description:
      "Breathing and sound practice for body relaxation",
    image: "/images/six-healing-sounds-01.png",
    href: "/therapy/six-healing-sounds",
    keywords: [
      "healing sounds",
      "breathing",
      "relaxation",
      "wellness",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Animations                                                          */
/* ------------------------------------------------------------------ */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.96,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.97,
    filter: "blur(3px)",
    transition: {
      duration: 0.24,
      ease: "easeOut",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AllTherapiesSection() {
  const prefersReducedMotion = useReducedMotion();

  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<TherapyCategory>("All");

  const [filterOpen, setFilterOpen] = useState(false);

  const [minimumRating, setMinimumRating] = useState(0);
  const [sortOption, setSortOption] =
    useState<SortOption>("Recommended");

  const [draftCategory, setDraftCategory] =
    useState<TherapyCategory>("All");
  const [draftRating, setDraftRating] = useState(0);
  const [draftSort, setDraftSort] =
    useState<SortOption>("Recommended");

  const openFilters = () => {
    setDraftCategory(activeCategory);
    setDraftRating(minimumRating);
    setDraftSort(sortOption);
    setFilterOpen(true);
  };

  const applyFilters = () => {
    setActiveCategory(draftCategory);
    setMinimumRating(draftRating);
    setSortOption(draftSort);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftCategory("All");
    setDraftRating(0);
    setDraftSort("Recommended");
  };

  const clearAllFilters = () => {
    setSearchValue("");
    setActiveCategory("All");
    setMinimumRating(0);
    setSortOption("Recommended");

    setDraftCategory("All");
    setDraftRating(0);
    setDraftSort("Recommended");
  };

  const filteredTherapies = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    const filtered = THERAPIES.filter((therapy) => {
      const matchesCategory =
        activeCategory === "All" ||
        therapy.category === activeCategory;

      const matchesRating =
        minimumRating === 0 ||
        therapy.rating >= minimumRating;

      const searchableText = [
        therapy.title,
        therapy.category,
        therapy.description,
        ...(therapy.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        search.length === 0 ||
        searchableText.includes(search);

      return (
        matchesCategory &&
        matchesRating &&
        matchesSearch
      );
    });

    if (sortOption === "Highest Rated") {
      return [...filtered].sort(
        (first, second) =>
          second.rating - first.rating
      );
    }

    if (sortOption === "Name A-Z") {
      return [...filtered].sort((first, second) =>
        first.title.localeCompare(second.title)
      );
    }

    if (sortOption === "Name Z-A") {
      return [...filtered].sort((first, second) =>
        second.title.localeCompare(first.title)
      );
    }

    return filtered;
  }, [
    activeCategory,
    minimumRating,
    searchValue,
    sortOption,
  ]);

  const appliedFilterCount =
    (minimumRating > 0 ? 1 : 0) +
    (sortOption !== "Recommended" ? 1 : 0);

  const animationKey = [
    activeCategory,
    minimumRating,
    sortOption,
    searchValue.trim().toLowerCase(),
  ].join("-");

  return (
    <>
      <motion.section
        variants={sectionVariants}
        initial={
          prefersReducedMotion ? false : "hidden"
        }
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.05,
        }}
        className="min-h-screen w-full overflow-hidden bg-[#f7f9fc] px-3 pb-18 pt-4 sm:px-5 lg:px-8"
      >
        <div className="mx-auto w-full max-w-[1180px]">
          {/* Search */}
          <motion.div
            initial={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <Search
              size={20}
              strokeWidth={2}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]"
            />

            <input
              type="text"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              placeholder="Search therapies..."
              aria-label="Search therapies"
              autoComplete="off"
              className="
                h-[54px] w-full rounded-full
                border border-[#5269ed]
                bg-white
                pl-[43px] pr-[92px]
                text-[14px] font-medium
                text-[#182033]
                outline-none
                transition-all duration-300
                placeholder:text-[#77879c]
                focus:border-[#3148d7]
                focus:shadow-[0_7px_22px_rgba(35,67,165,0.11)]
                sm:h-[58px] sm:text-[15px]
              "
            />

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <AnimatePresence>
                {searchValue.length > 0 && (
                  <motion.button
                    type="button"
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    onClick={() => setSearchValue("")}
                    aria-label="Clear search"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#3151a6] transition-colors active:bg-black/5"
                  >
                    <X size={17} strokeWidth={2.4} />
                  </motion.button>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={openFilters}
                aria-label="Open filters"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#243047] transition-colors active:bg-black/5"
              >
                <SlidersHorizontal
                  size={20}
                  strokeWidth={2.2}
                />

                {appliedFilterCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#2843d6] px-1 text-[9px] font-bold text-white">
                    {appliedFilterCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 18,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.12,
              duration: 0.58,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              -mx-3 mt-5 flex gap-2.5
              overflow-x-auto px-3 pb-2
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              sm:mx-0 sm:px-0
            "
          >
            {CATEGORIES.map((category) => {
              const isActive =
                activeCategory === category;

              return (
                <motion.button
                  key={category}
                  type="button"
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`
                    relative shrink-0 overflow-hidden
                    rounded-full border
                    px-4 py-[8px]
                    text-[12px] font-semibold
                    transition-colors duration-300
                    sm:px-5 sm:py-2.5 sm:text-[14px]
                    ${
                      isActive
                        ? "border-transparent text-white shadow-[0_7px_18px_rgba(24,83,210,0.24)]"
                        : "border-[#dce4ed] bg-[#f8fafc] text-[#718096]"
                    }
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="selected-therapy-category"
                      className="absolute inset-0 bg-[linear-gradient(180deg,#3514b6_0%,#1656d5_58%,#069de6_100%)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {category}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.58,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 flex items-end justify-between gap-2"
          >
            <h2 className="min-w-0 text-[17px] font-extrabold leading-tight tracking-[-0.35px] text-black sm:text-[25px]">
              Start Your Recovery Journey
            </h2>

            <motion.p
              key={filteredTherapies.length}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="shrink-0 pb-0.5 text-[12px] font-semibold text-[#263ed0] sm:text-[15px]"
            >
              {filteredTherapies.length} Available
            </motion.p>
          </motion.div>

          {/* Active filters */}
          <AnimatePresence>
            {(minimumRating > 0 ||
              sortOption !== "Recommended") && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3 flex flex-wrap items-center gap-2 overflow-hidden"
              >
                {minimumRating > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setMinimumRating(0)
                    }
                    className="flex items-center gap-1 rounded-full bg-[#edf3ff] px-3 py-1.5 text-[11px] font-semibold text-[#2446c7]"
                  >
                    {minimumRating}+ rating
                    <X size={12} />
                  </button>
                )}

                {sortOption !== "Recommended" && (
                  <button
                    type="button"
                    onClick={() =>
                      setSortOption("Recommended")
                    }
                    className="flex items-center gap-1 rounded-full bg-[#edf3ff] px-3 py-1.5 text-[11px] font-semibold text-[#2446c7]"
                  >
                    {sortOption}
                    <X size={12} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cards */}
          <AnimatePresence mode="wait">
            {filteredTherapies.length > 0 ? (
              <motion.div
                key={animationKey}
                variants={listVariants}
                initial={
                  prefersReducedMotion
                    ? false
                    : "hidden"
                }
                animate="visible"
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.16,
                  },
                }}
                className="
                  mt-5 grid grid-cols-2
                  gap-x-3 gap-y-4
                  sm:grid-cols-3 sm:gap-5
                  lg:grid-cols-4
                  xl:grid-cols-5
                "
              >
                {filteredTherapies.map((therapy) => (
                  <motion.article
                    layout
                    key={therapy.id}
                    variants={cardVariants}
                    exit="exit"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    whileTap={{
                      scale: 0.985,
                    }}
                    transition={{
                      layout: {
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className="
                      min-w-0 overflow-hidden
                      rounded-[18px]
                      bg-white p-2 
                      shadow-[0_7px_22px_rgba(29,45,72,0.08)]
                      sm:rounded-[22px] sm:p-3
                    "
                  >
                    <Link
                      href={therapy.href}
                      className="group block"
                    >
                      {/* Image */}
                      <div className="relative mx-auto h-[159px] w-[172px] max-w-full overflow-hidden rounded-[14px] bg-[#edf1f5] sm:rounded-[17px]">
                        <Image
                          src={therapy.image}
                          alt={therapy.title}
                          fill
                          draggable={false}
                          sizes="159px"
                          className="
                            pointer-events-none
                            select-none object-cover
                            object-center
                            transition-transform
                            duration-700
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:scale-[1.04]
                          "
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent" />
                      </div>

                      {/* Category and rating */}
                      <div className="mt-2.5 flex items-center justify-between gap-1.5">
                        <span className="min-w-0 truncate rounded-[7px] bg-[#edf4ff] px-2 py-1 text-[10px] font-bold text-[#2250ce] sm:text-[12px]">
                          {therapy.category}
                        </span>

                        <div className="flex shrink-0 items-center gap-1">
                          <Star
                            size={14}
                            strokeWidth={2.4}
                            className="text-[#f5a000]"
                          />

                          <span className="text-[11px] font-bold text-[#202124] sm:text-[13px]">
                            {therapy.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2 line-clamp-2 min-h-[34px] text-[14px] font-extrabold leading-[1.2] tracking-[-0.2px] text-black sm:min-h-[40px] sm:text-[17px]">
                        {therapy.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-1.5 line-clamp-2 min-h-[34px] text-[11px] font-medium leading-[1.35] text-[#929292] sm:min-h-[38px] sm:text-[13px]">
                        {therapy.description}
                      </p>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-16 flex flex-col items-center justify-center px-6 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(30,50,80,0.09)]">
                  <Search
                    size={27}
                    className="text-[#8190a4]"
                  />
                </div>

                <h3 className="mt-4 text-[18px] font-bold text-[#172033]">
                  No therapies found
                </h3>

                <p className="mt-1 max-w-[280px] text-[13px] leading-relaxed text-[#8591a3]">
                  Try a different keyword, category or rating.
                </p>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-5 rounded-full bg-[#263fd1] px-5 py-2.5 text-[13px] font-semibold text-white"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Filter bottom sheet */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filter panel"
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
                duration: 0.25,
              }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 z-[1000] bg-black/35 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 31,
                mass: 0.9,
              }}
              className="
                fixed inset-x-0 bottom-0 z-[1001]
                max-h-[88vh] overflow-y-auto
                rounded-t-[28px] bg-white
                px-5 pb-[calc(22px+env(safe-area-inset-bottom))]
                pt-3 shadow-[0_-20px_50px_rgba(0,0,0,0.16)]
                sm:left-1/2 sm:max-w-[520px]
                sm:-translate-x-1/2
              "
            >
              <div className="mx-auto h-1.5 w-11 rounded-full bg-[#d7dbe2]" />

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-[21px] font-extrabold text-[#151c2b]">
                    Filter Therapies
                  </h3>

                  <p className="mt-0.5 text-[12px] text-[#8a94a4]">
                    Refine the therapy results
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f5f8] text-[#313b4d]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category */}
              <div className="mt-6">
                <h4 className="text-[15px] font-bold text-[#202839]">
                  Category
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => {
                    const isSelected =
                      draftCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setDraftCategory(category)
                        }
                        className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all ${
                          isSelected
                            ? "border-[#274ad4] bg-[#edf3ff] text-[#274ad4]"
                            : "border-[#dfe5ed] bg-white text-[#6f7d91]"
                        }`}
                      >
                        {isSelected && (
                          <Check size={14} />
                        )}

                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6">
                <h4 className="text-[15px] font-bold text-[#202839]">
                  Minimum Rating
                </h4>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {RATINGS.map((rating) => {
                    const isSelected =
                      draftRating === rating;

                    return (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setDraftRating(rating)
                        }
                        className={`flex h-[46px] items-center justify-center gap-1.5 rounded-[13px] border text-[13px] font-semibold transition-all ${
                          isSelected
                            ? "border-[#274ad4] bg-[#edf3ff] text-[#274ad4]"
                            : "border-[#dfe5ed] bg-white text-[#657287]"
                        }`}
                      >
                        {rating === 0 ? (
                          "Any rating"
                        ) : (
                          <>
                            <Star
                              size={16}
                              className="text-[#f5a000]"
                            />
                            {rating}+ ratings
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div className="mt-6">
                <h4 className="text-[15px] font-bold text-[#202839]">
                  Sort By
                </h4>

                <div className="mt-3 space-y-2">
                  {SORT_OPTIONS.map((option) => {
                    const isSelected =
                      draftSort === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setDraftSort(option)
                        }
                        className={`flex h-[48px] w-full items-center justify-between rounded-[13px] border px-4 text-left text-[13px] font-semibold transition-all ${
                          isSelected
                            ? "border-[#274ad4] bg-[#edf3ff] text-[#274ad4]"
                            : "border-[#e1e6ed] bg-white text-[#566276]"
                        }`}
                      >
                        {option}

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-[#274ad4] bg-[#274ad4]"
                              : "border-[#cbd2dc]"
                          }`}
                        >
                          {isSelected && (
                            <Check
                              size={13}
                              className="text-white"
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buttons */}
              <div className="sticky bottom-0 mt-7 grid grid-cols-[0.8fr_1.2fr] gap-3 bg-white pb-1 pt-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="h-[50px] rounded-full border border-[#d9e0e9] bg-white text-[14px] font-bold text-[#4f5c70]"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={applyFilters}
                  className="h-[50px] rounded-full bg-[linear-gradient(180deg,#315ae2_0%,#2432b7_100%)] text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(37,58,190,0.25)]"
                >
                  Apply Filters
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}