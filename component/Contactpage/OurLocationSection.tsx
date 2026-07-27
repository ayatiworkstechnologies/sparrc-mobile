"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Location data                                                       */
/* ------------------------------------------------------------------ */

const LOCATION = {
  name: "SPARRC - Alwarpet",
  address:
    "#4, Alwarpet St, behind Hushpuppies Showroom, Seetammal Colony, Alwarpet, Chennai, Tamil Nadu 600018",
  phoneNumbers: [
    {
      label: "044-45066131",
      href: "tel:04445066131",
    },
    {
      label: "044-42059405",
      href: "tel:04442059405",
    },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.031353120536!2d80.2529045!3d13.033675400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266360d32a0f9%3A0xbc4bfd812341d6d8!2sSparrc%20Institute%20Alwarpet!5e0!3m2!1sen!2sin!4v1785148072367!5m2!1sen!2sin",
};

/* ------------------------------------------------------------------ */
/* Motion                                                              */
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
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mapVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function OurLocationSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={sectionVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.18,
      }}
      className="w-full bg-white px-4 py-5 sm:px-6 sm:py-8"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Heading */}
        <motion.div variants={textVariants}>
          <h2 className="text-[20px] font-extrabold leading-tight tracking-[-0.4px] text-[#111827] sm:text-[26px]">
            Our Location
          </h2>

          <p className="mt-1.5 max-w-[620px] text-[13px] font-medium leading-[1.45] text-[#657288] sm:text-[15px]">
            Visit our specialized sports medicine &amp; physiotherapy center.
          </p>
        </motion.div>

        {/* Location card */}
        <motion.article
          variants={cardVariants}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  y: -3,
                }
          }
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 24,
          }}
          className="mt-4 overflow-hidden rounded-[20px] border border-[#dbe3ee] bg-white p-3 shadow-[0_10px_30px_rgba(30,49,80,0.07)] sm:rounded-[24px] sm:p-5"
        >
          {/* Google map */}
          <motion.div
            variants={mapVariants}
            className="relative h-[200px] w-full overflow-hidden rounded-[15px] bg-[#eef2f7] sm:h-[300px] sm:rounded-[18px]"
          >
            <iframe
              src={LOCATION.mapEmbedUrl}
              title="SPARRC Alwarpet location"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </motion.div>

          {/* Details */}
          <motion.div variants={textVariants} className="pt-3.5 sm:pt-4">
            <h3 className="text-[17px] font-extrabold leading-tight tracking-[-0.25px] text-[#111111] sm:text-[21px]">
              {LOCATION.name}
            </h3>

            <p className="mt-2 text-[13px] font-medium leading-[1.5] text-[#657288] sm:max-w-[780px] sm:text-[15px]">
              {LOCATION.address}
            </p>

            {/* Phone numbers */}
            <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
              {LOCATION.phoneNumbers.map((phone, index) => (
                <motion.a
                  key={phone.label}
                  href={phone.href}
                  initial={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: -10,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.16 + index * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="flex w-fit items-center gap-2 text-[14px] font-semibold text-[#2445d8] transition-opacity hover:opacity-75 sm:text-[16px]"
                >
                  <Phone
                    size={17}
                    strokeWidth={2.4}
                    className="shrink-0 sm:h-5 sm:w-5"
                  />

                  <span>{phone.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </motion.section>
  );
}