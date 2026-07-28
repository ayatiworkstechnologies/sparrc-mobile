"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { HeartPulse } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const highlightVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WhoWeAreSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={sectionVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      className="w-full bg-white px-4 py-5 sm:px-6 sm:py-7"
    >
      <div className="mx-auto w-full max-w-[420px]">
        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-[19px] font-extrabold leading-tight tracking-[-0.35px] text-[#111111] sm:text-[22px]"
        >
          Who We Are
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-3 text-[13px] font-medium leading-[1.48] text-[#718096] sm:text-[14px]"
        >
          SPARRC (Sports Performance Assessment Rehabilitation Research
          Counselling) is India&apos;s pioneering Sports &amp; Fitness Medicine
          institute, founded in 2006 by Dr. Kannan Pugazhendi.
        </motion.p>

        {/* Highlight box */}
        <motion.div
          variants={highlightVariants}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  y: -2,
                }
          }
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 24,
          }}
          className="mt-4 flex items-center gap-3 rounded-[11px] bg-[#edf3ff] px-4 py-3"
        >
          <motion.span
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.08,
                    rotate: -4,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 22,
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center text-[#3152d5]"
          >
            <HeartPulse
              size={21}
              strokeWidth={2.3}
            />
          </motion.span>

          <p className="text-[13px] font-extrabold leading-tight text-[#2b46c7] sm:text-[14px]">
            We prescribe exercises — not medicines.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}