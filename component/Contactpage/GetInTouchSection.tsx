"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: IconType;
  ariaLabel: string;
};

/* ------------------------------------------------------------------ */
/* Contact data                                                        */
/* ------------------------------------------------------------------ */

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "call",
    label: "Call",
    value: "+91 965 965 0000",
    href: "tel:+919659650000",
    icon: Phone,
    ariaLabel: "Call SPARRC at +91 965 965 0000",
  },
  {
    id: "email",
    label: "Email",
    value: "sparrc@gmail.com",
    href: "mailto:sparrc@gmail.com",
    icon: Mail,
    ariaLabel: "Email SPARRC at sparrc@gmail.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+91 965 965 0000",
    href: "https://wa.me/919659650000",
    icon: FaWhatsapp,
    ariaLabel: "Message SPARRC on WhatsApp",
  },
];

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
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
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

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function GetInTouchSection() {
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
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Heading */}
        <motion.div variants={textVariants}>
          <h2 className="text-[18px] font-extrabold leading-tight tracking-[-0.35px] text-[#111827] sm:text-[24px]">
            Get in touch with SPARRC
          </h2>

          <p className="mt-2 max-w-[620px] text-[13px] font-medium leading-[1.5] text-[#718096] sm:text-[15px]">
            We are here to support your fitness, rehab, and therapy
            journey. Choose a channel below or visit our centers.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={cardsContainerVariants}
          className="mt-5 grid grid-cols-3 gap-3 sm:max-w-[760px] sm:gap-4"
        >
          {CONTACT_CHANNELS.map((channel) => {
            const Icon = channel.icon;

            return (
              <motion.a
                key={channel.id}
                href={channel.href}
                target={
                  channel.id === "whatsapp" ? "_blank" : undefined
                }
                rel={
                  channel.id === "whatsapp"
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={channel.ariaLabel}
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  group flex min-w-0 flex-col items-center
                  rounded-[16px] border border-[#d9e2ef]
                  bg-white px-2 py-4
                  text-center
                  shadow-[0_5px_16px_rgba(28,44,73,0.04)]
                  transition-shadow duration-300
                  hover:shadow-[0_10px_24px_rgba(28,44,73,0.10)]
                  sm:px-4 sm:py-5
                "
              >
                {/* Blue icon circle for all cards */}
                <motion.span
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: 1.07,
                          rotate:
                            channel.id === "call"
                              ? -5
                              : channel.id === "whatsapp"
                                ? 4
                                : 0,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-full
                    bg-[#edf3ff]
                    text-[#3152d5]
                    sm:h-12 sm:w-12
                  "
                >
                  <Icon className="h-[21px] w-[21px] sm:h-[23px] sm:w-[23px]" />
                </motion.span>

                {/* Label */}
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.05em] text-[#a0a9b8] sm:text-[12px]">
                  {channel.label}
                </span>

                {/* Value */}
                <span className="mt-1 block w-full truncate text-[10px] font-extrabold leading-tight text-[#20242d] sm:text-[13px]">
                  {channel.value}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}