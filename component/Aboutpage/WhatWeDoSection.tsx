"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Activity,
  ClipboardCheck,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Pain Management",
    description:
      "Scientific relief from acute and chronic musculoskeletal conditions.",
    icon: Activity,
  },
  {
    id: 2,
    title: "Sports Rehabilitation",
    description:
      "Comprehensive coaching for quick and safe return-to-sport.",
    icon: Dumbbell,
  },
  {
    id: 3,
    title: "Prescribed Exercise",
    description:
      "Tailored clinical workouts focused on long-term disease management.",
    icon: ClipboardCheck,
  },
];

/* ------------------------------------------------------------------ */
/* Animation                                                           */
/* ------------------------------------------------------------------ */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WhatWeDoSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={sectionVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="w-full bg-white px-4 py-5 sm:px-6 sm:py-7"
    >
      <div className="mx-auto w-full max-w-[420px]">
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          className="text-[18px] font-extrabold leading-tight tracking-[-0.35px] text-[#111111] sm:text-[22px]"
        >
          What We Do
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={listVariants}
          className="mt-4 space-y-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.008,
                      }
                }
                whileTap={{
                  scale: 0.985,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 25,
                }}
                className="
                  group flex min-h-[86px] items-center gap-4
                  rounded-[16px]
                  border border-[#dbe3ee]
                  bg-[#f8fafc]
                  px-4 py-4
                  shadow-[0_5px_16px_rgba(30,48,75,0.04)]
                  transition-shadow duration-500
                  hover:shadow-[0_10px_24px_rgba(30,48,75,0.08)]
                "
              >
                {/* Icon box */}
                <motion.span
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          rotate:
                            service.id === 2
                              ? -4
                              : service.id === 3
                                ? 3
                                : 0,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  className="
                    flex h-[50px] w-[50px] shrink-0
                    items-center justify-center
                    rounded-[12px]
                    bg-[#eaf1ff]
                    text-[#3155e7]
                  "
                >
                  <Icon
                    size={26}
                    strokeWidth={2.15}
                  />
                </motion.span>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold leading-tight tracking-[-0.2px] text-[#171717] sm:text-[16px]">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 text-[12px] font-medium leading-[1.4] text-[#718096] sm:text-[13px]">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}    