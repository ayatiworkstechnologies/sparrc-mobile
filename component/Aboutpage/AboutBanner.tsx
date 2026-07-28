"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type TherapyBannerProps = {
  image?: string;
  alt?: string;
  className?: string;
};

export default function AboutBanner({
  image = "/images/about-banner.png",
  alt = "About our clinic",
  className = "",
}: TherapyBannerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: 18,
              scale: 0.98,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full bg-white px-0 py-2 ${className}`}
    >
      <div className="mx-auto w-full max-w-[420px]">
        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.015,
                }
          }
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-[220px] w-[420px] max-w-full overflow-hidden  bg-[#eef2f6] shadow-[0_10px_28px_rgba(25,40,70,0.10)]"
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            draggable={false}
            sizes="(max-width: 420px) 100vw, 420px"
            className="pointer-events-none select-none object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.10] via-transparent to-white/[0.03]" />
        </motion.div>
      </div>
    </motion.section>
  );
}