"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Target } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ImpactItem = {
  id: number;
  number: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration: number;
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const IMPACT_ITEMS: ImpactItem[] = [
  {
    id: 1,
    number: 1,
    suffix: "M+",
    label: "Patients Helped",
    duration: 2200,
  },
  {
    id: 2,
    number: 95,
    suffix: "%",
    label: "Surgery Avoidance",
    duration: 2500,
  },
  {
    id: 3,
    number: 200,
    suffix: "+",
    label: "Team Members",
    duration: 2700,
  },
  {
    id: 4,
    number: 8,
    label: "Centers Across India",
    duration: 2000,
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const missionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.97,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Animated number                                                     */
/* ------------------------------------------------------------------ */

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration: number;
  shouldStart: boolean;
  reducedMotion: boolean;
};

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration,
  shouldStart,
  reducedMotion,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(
    reducedMotion ? value : 0
  );

  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let animationFrameId = 0;
    let startTime: number | null = null;

    const animateNumber = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      /*
       * Slow and smooth ease-out.
       */
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      setDisplayValue(
        Math.round(value * easedProgress)
      );

      if (progress < 1) {
        animationFrameId =
          window.requestAnimationFrame(animateNumber);
      }
    };

    animationFrameId =
      window.requestAnimationFrame(animateNumber);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    duration,
    reducedMotion,
    shouldStart,
    value,
  ]);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function OurImpactSection() {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const sectionRef =
    useRef<HTMLElement | null>(null);

  /*
   * Animation starts when approximately 15% of this
   * section enters the viewport.
   */
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -40px 0px",
  });

  return (
    <motion.section
      ref={sectionRef}
      variants={sectionVariants}
      initial={
        prefersReducedMotion ? false : "hidden"
      }
      animate={
        isSectionInView ? "visible" : "hidden"
      }
      className="w-full overflow-hidden bg-white px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mx-auto w-full max-w-[420px]">
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          className="text-[19px] font-extrabold leading-tight tracking-[-0.35px] text-[#111111] sm:text-[23px]"
        >
          Our Impact
        </motion.h2>

        {/* Impact cards */}
        <motion.div
          variants={cardsContainerVariants}
          className="mt-4 grid grid-cols-2 gap-2.5"
        >
          {IMPACT_ITEMS.map((item) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -2,
                      scale: 1.01,
                    }
              }
              whileTap={{
                scale: 0.985,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 26,
              }}
              className="
                rounded-[13px]
                border border-[#dfe5ed]
                bg-[#f8fafc]
                px-4 py-4
                shadow-[0_4px_14px_rgba(30,48,75,0.04)]
                transition-shadow duration-500
                hover:shadow-[0_9px_22px_rgba(30,48,75,0.08)]
              "
            >
              {/* Animated value */}
              <motion.p
                initial={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.88,
                      }
                }
                animate={
                  isSectionInView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0.88,
                      }
                }
                transition={{
                  delay: 0.28 + item.id * 0.12,
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[22px] font-extrabold leading-none tracking-[-0.45px] text-[#2445d8] sm:text-[25px]"
              >
                <AnimatedNumber
                  value={item.number}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={item.duration}
                  shouldStart={isSectionInView}
                  reducedMotion={prefersReducedMotion}
                />
              </motion.p>

              {/* Label */}
              <p className="mt-2.5 text-[12px] font-semibold leading-[1.35] text-[#66748a] sm:text-[13px]">
                {item.label}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Mission card */}
        <motion.article
          variants={missionVariants}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  y: -2,
                }
          }
          whileTap={{
            scale: 0.995,
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 26,
          }}
          className="
            mt-6 rounded-[16px]
            border border-[#dfe5ed]
            bg-[#f8fafc]
            px-4 py-5
            shadow-[0_5px_16px_rgba(30,48,75,0.04)]
            transition-shadow duration-500
            hover:shadow-[0_10px_24px_rgba(30,48,75,0.08)]
            sm:px-5 sm:py-5
          "
        >
          {/* Mission heading */}
          <div className="flex items-center gap-2.5">
            <motion.span
              initial={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.7,
                      rotate: -15,
                    }
              }
              animate={
                isSectionInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.7,
                      rotate: -15,
                    }
              }
              transition={{
                delay: 0.8,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.08,
                      rotate: -4,
                    }
              }
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-[#3152d5]"
            >
              <Target
                size={18}
                strokeWidth={2.4}
              />
            </motion.span>

            <motion.h3
              initial={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x: -8,
                    }
              }
              animate={
                isSectionInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {
                      opacity: 0,
                      x: -8,
                    }
              }
              transition={{
                delay: 0.88,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[16px] font-extrabold leading-tight text-[#171717] sm:text-[18px]"
            >
              Our Mission
            </motion.h3>
          </div>

          {/* Mission description */}
          <motion.p
            initial={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={
              isSectionInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            transition={{
              delay: 1,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3 text-[13px] font-medium leading-[1.6] text-[#718096] sm:text-[15px]"
          >
            To design scientific exercise interventions that maximize
            performance and facilitate recovery from illness, injury,
            surgery, and disability.
          </motion.p>
        </motion.article>
      </div>
    </motion.section>
  );
}