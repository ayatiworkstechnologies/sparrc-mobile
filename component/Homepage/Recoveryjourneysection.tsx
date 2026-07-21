"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/*                                                                      */
/*  Put real files here:                                               */
/*    - card photos  -> /public/images/therapies/<name>.jpg            */
/*    - pill / tag icons -> /public/icons/<name>.svg                   */
/*  then just update the `image` / `icon` paths below. Nothing else    */
/*  in the component needs to change.                                  */
/* ------------------------------------------------------------------ */

export interface TherapyItem {
  id: string;
  title: string;
  tag: string;
  image: string; // /public/images/therapies/...
  icon: string; // /public/icons/...
  href: string; // page this card navigates to
}

export const THERAPIES: TherapyItem[] = [
  { id: "physiotherapy", title: "Physiotherapy", tag: "Theraphy", image: "/images/physiotherapy.png", icon: "/icons/theraphy.svg", href: "/therapies/physiotherapy" },
  { id: "mtpt", title: "MTPT", tag: "Theraphy", image: "/images/mtpt-1.png", icon: "/icons/theraphy.svg", href: "/therapies/mtpt" },
  { id: "pemf", title: "PEMF", tag: "Theraphy", image: "/images/pemf.png", icon: "/icons/theraphy.svg", href: "/therapies/pemf" },
  { id: "group-therapy", title: "Group Therapy", tag: "Theraphy", image: "/images/group-therapy.png", icon: "/icons/theraphy.svg", href: "/therapies/group-therapy" },
  { id: "yoga-therapy", title: "Yoga Therapy", tag: "Theraphy", image: "/images/yoga-therapy.png", icon: "/icons/theraphy.svg", href: "/therapies/yoga-therapy" },
  { id: "functional-training", title: "Functional Training", tag: "Theraphy", image: "/images/functional-training.png", icon: "/icons/theraphy.svg", href: "/therapies/functional-training" },
  { id: "prescription-exercise", title: "Prescription Exercise", tag: "Theraphy", image: "/images/prescription-exercise.png", icon: "/icons/theraphy.svg", href: "/therapies/prescription-exercise" },
  { id: "sports-massage", title: "Sports Massage", tag: "Theraphy", image: "/images/sports-massage.png", icon: "/icons/theraphy.svg", href: "/therapies/sports-massage" },
  { id: "aquatherapy", title: "Aquatherapy", tag: "Theraphy", image: "/images/aquatherapy.png", icon: "/icons/theraphy.svg", href: "/therapies/aquatherapy" },
  { id: "kalaripayattu", title: "Kalaripayattu", tag: "Theraphy", image: "/images/kalaripayattu.png", icon: "/icons/theraphy.svg", href: "/therapies/kalaripayattu" },
  { id: "cranio-sacral", title: "Cranio Sacral Therapy", tag: "Theraphy", image: "/images/cranio-sacral.png", icon: "/icons/theraphy.svg", href: "/therapies/cranio-sacral" },
  { id: "six-healing-sounds", title: "Six Healing Sounds", tag: "Theraphy", image: "/images/six-healing-sounds.png", icon: "/icons/theraphy.svg", href: "/therapies/six-healing-sounds" },
];

export interface FilterOption {
  id: string;
  label: string;
  icon: string; // /public/icons/...
}

export const FILTERS: FilterOption[] = [
  { id: "theraphy", label: "Theraphy", icon: "/icons/theraphy.svg" },
  { id: "department", label: "Department", icon: "/icons/theraphy.svg" },
  { id: "special", label: "Special Theraphy", icon: "/icons/theraphy.svg" },
];

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Autoplay config                                                     */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 130; // px — must match the card width below
const CARD_GAP = 12; // px — matches gap-3
const AUTOPLAY_INTERVAL = 2800; // ms between advances
const RESUME_DELAY = 2000; // ms of inactivity before autoplay picks back up

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RecoveryJourneySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Auto-advance the carousel, looping back to the start at the end.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const step = CARD_WIDTH + CARD_GAP;

    const intervalId = setInterval(() => {
      if (isPausedRef.current) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= maxScroll - step / 2;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: "smooth",
      });
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  // Pause on any user interaction, then resume automatically after a short pause.
  const pauseAutoplay = () => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const scheduleResume = (delay = RESUME_DELAY) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section className="w-full bg-white py-6 px-4">
      {/* Heading + pills + subtitle */}
      <div>
        <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-neutral-900">
          What are you recovering from?
        </h2>

        {/* Filter pills — uniform style, matches the reference exactly */}
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[13px] font-medium text-neutral-900 shadow-sm active:scale-[0.97] transition-transform duration-150"
            >
              <Image src={filter.icon} alt="" width={16} height={16} className="shrink-0" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-[13px] font-medium text-neutral-400">Start Your Recovery Journey</p>
      </div>

      {/* Carousel — same left inset as the heading above; scrolls under the section's own right padding */}
      <div
        ref={trackRef}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={() => scheduleResume(0)}
        onTouchStart={pauseAutoplay}
        onTouchEnd={() => scheduleResume()}
        onPointerDown={pauseAutoplay}
        onPointerUp={() => scheduleResume()}
        className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {THERAPIES.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="w-[130px] shrink-0 snap-start"
          >
            <Link href={item.href} className="group block">
              <div className="relative h-[100px] w-[130px] overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={130}
                  height={100}
                  className="h-[100px] w-[130px] object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-2 truncate text-[15px] font-bold text-neutral-900">{item.title}</p>
              <div className="mt-0.5 flex items-center gap-1 text-[12px] text-neutral-400">
                <Image src={item.icon} alt="" width={12} height={12} />
                <span>{item.tag}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}