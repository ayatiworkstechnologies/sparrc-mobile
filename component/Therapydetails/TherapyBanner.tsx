"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type TherapyBannerProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export default function TherapyBanner({
  src,
  alt,
  priority = false,
  className = "",
}: TherapyBannerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 35,
              scale: 0.98,
              filter: "blur(6px)",
            }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <div className="relative h-[380px] w-full sm:h-[430px] md:h-[500px] lg:h-[580px] xl:h-[650px]">
        <motion.div
          initial={shouldReduceMotion ? undefined : { scale: 1.08 }}
          whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Soft overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5" />
      </div>
    </motion.section>
  );
}