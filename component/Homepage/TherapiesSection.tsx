"use client";

import Image from "next/image";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type TherapySearchItem = {
  id: number;
  name: string;
  description: string;
  keywords?: string[];
  href: string;
};

type GalleryImage = {
  id: number;
  image: string;
  alt: string;
};

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

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    image: "/images/mtpt.png",
    alt: "SPARRC physiotherapy treatment",
  },
  {
    id: 2,
    image: "/images/mtpt.png",
    // image: "/images/therapy-2.png",
    alt: "SPARRC rehabilitation treatment",
  },
  {
    id: 3,
    image: "/images/mtpt.png",
    // image: "/images/therapy-3.png",
    alt: "SPARRC mobility treatment",
  },
];

export default function TherapiesSection() {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const filteredTherapies = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      return therapyPages;
    }

    return therapyPages.filter((therapy) => {
      const searchableText = [
        therapy.name,
        therapy.description,
        ...(therapy.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [searchValue]);

  const visibleCards = useMemo(() => {
    return [0, 1, 2].map((offset) => {
      const index =
        (activeIndex + offset) % galleryImages.length;

      return {
        ...galleryImages[index],
        stackPosition: offset,
      };
    });
  }, [activeIndex]);

  const goToNextSlide = () => {
    setActiveIndex(
      (current) => (current + 1) % galleryImages.length
    );
  };

  const goToPreviousSlide = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + galleryImages.length) %
        galleryImages.length
    );
  };

  const selectTherapy = (therapy: TherapySearchItem) => {
    setSearchValue(therapy.name);
    setIsSearchFocused(false);
    router.push(therapy.href);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" &&
      filteredTherapies.length > 0
    ) {
      event.preventDefault();
      selectTherapy(filteredTherapies[0]);
    }

    if (event.key === "Escape") {
      setIsSearchFocused(false);
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -60) {
      goToNextSlide();
    }

    if (info.offset.x > 60) {
      goToPreviousSlide();
    }
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % galleryImages.length
      );
    }, 5500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[390px_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[370px] lg:mx-0">
            {/* Search */}
            <div
              ref={searchContainerRef}
              className="relative z-30"
            >
              <div
                className={`flex min-h-[58px] items-center rounded-full border bg-white px-4 shadow-[0_5px_22px_rgba(19,34,68,0.06)] transition ${
                  isSearchFocused
                    ? "border-[#51479d]"
                    : "border-[#e7e7e7]"
                }`}
              >
                <Search
                  size={25}
                  strokeWidth={1.9}
                  className="shrink-0 text-[#182033]"
                />

                <div className="ml-3 min-w-0 flex-1">
                  <label
                    htmlFor="therapy-search"
                    className="block text-[11px] font-medium leading-none text-[#8b8b8b]"
                  >
                    Search
                  </label>

                  <input
                    id="therapy-search"
                    type="text"
                    value={searchValue}
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                      setIsSearchFocused(true);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Therapy"
                    autoComplete="off"
                    className="mt-1 w-full bg-transparent text-[14px] font-normal text-[#182033] outline-none placeholder:text-[#9b9b9b]"
                  />
                </div>

                {searchValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchValue("");
                      setIsSearchFocused(true);
                    }}
                    aria-label="Clear therapy search"
                    className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f6f8] text-[#182033]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="absolute left-0 right-0 top-[66px] max-h-[250px] overflow-y-auto rounded-[20px] border border-[#eceef2] bg-white p-2 shadow-[0_16px_40px_rgba(20,30,55,0.12)]"
                  >
                    {filteredTherapies.length > 0 ? (
                      filteredTherapies.map((therapy) => (
                        <button
                          key={therapy.id}
                          type="button"
                          onMouseDown={(event) =>
                            event.preventDefault()
                          }
                          onClick={() =>
                            selectTherapy(therapy)
                          }
                          className="flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left transition hover:bg-[#f5f7fa]"
                        >
                          <Search
                            size={17}
                            strokeWidth={1.7}
                            className="shrink-0 text-[#8b91a0]"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-medium text-[#182033]">
                              {therapy.name}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-[#8b91a0]">
                              {therapy.description}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-6 text-center text-[13px] text-[#8b91a0]">
                        No therapy found
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Exact original gallery layout */}
            <div
              className="relative mt-5 h-[340px] w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <AnimatePresence initial={false}>
                {visibleCards
                  .slice()
                  .reverse()
                  .map((galleryImage) => {
                    const position =
                      galleryImage.stackPosition;

                    return (
                      <motion.div
                        key={galleryImage.id}
                        drag={
                          position === 0 ? "x" : false
                        }
                        dragConstraints={{
                          left: 0,
                          right: 0,
                        }}
                        dragElastic={0.16}
                        dragMomentum={false}
                        onDragEnd={handleDragEnd}
                        initial={{
                          opacity: 0,
                          x: 55,
                          scale: 0.92,
                        }}
                        animate={{
                          opacity: 1,
                          x: position * 17,
                          y: position * 14,
                          scale:
                            1 - position * 0.055,
                          zIndex: 20 - position,
                        }}
                        exit={{
                          opacity: 0,
                          x: -80,
                          scale: 0.94,
                        }}
                        transition={{
                          x: {
                            duration: 1.1,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                          y: {
                            duration: 1.1,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                          scale: {
                            duration: 1.1,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                          opacity: {
                            duration: 0.8,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                        }}
                        className={`absolute left-0 top-0 h-[320px] w-[calc(100%-28px)] overflow-hidden rounded-[20px] bg-[#e9e9e9] shadow-[0_15px_38px_rgba(16,29,50,0.12)] will-change-transform ${
                          position === 0
                            ? "cursor-grab active:cursor-grabbing"
                            : ""
                        }`}
                      >
                        <Image
                          src={galleryImage.image}
                          alt={galleryImage.alt}
                          fill
                          priority={position === 0}
                          draggable={false}
                          sizes="(max-width: 640px) 90vw, 370px"
                          className={`pointer-events-none select-none object-cover transition duration-1000 ${
                            position === 0
                              ? "grayscale-0"
                              : "grayscale"
                          }`}
                        />
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>

            {/* Exact original dots */}
            <div className="mt-2 flex items-center justify-center gap-2">
              {galleryImages.map((galleryImage, index) => (
                <button
                  key={galleryImage.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View gallery image ${index + 1}`}
                  className={`h-[6px] rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-6 bg-[#51479d]"
                      : "w-[6px] bg-[#d8dae0]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}