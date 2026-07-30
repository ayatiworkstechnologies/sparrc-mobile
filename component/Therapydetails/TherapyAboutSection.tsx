"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type TherapyItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
  icon: string;
  href: string;
};

type TherapyAboutSectionProps = {
  currentTherapyId: string;
  description: string;
  bestFor: string[];
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* All therapies                                                              */
/* -------------------------------------------------------------------------- */

const THERAPIES: TherapyItem[] = [
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    tag: "Therapy",
    image: "/images/physiotherapy.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/physiotherapy",
  },
  {
    id: "mtpt",
    title: "MTPT",
    tag: "Therapy",
    image: "/images/mtpt-1.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/mtpt",
  },
  {
    id: "pemf",
    title: "PEMF",
    tag: "Therapy",
    image: "/images/pemf.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/pemf",
  },
  {
    id: "group-therapy",
    title: "Group Therapy",
    tag: "Therapy",
    image: "/images/group-therapy.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/group-therapy",
  },
  {
    id: "yoga-therapy",
    title: "Yoga Therapy",
    tag: "Therapy",
    image: "/images/yoga-therapy.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/yoga-therapy",
  },
  {
    id: "functional-training",
    title: "Functional Training",
    tag: "Therapy",
    image: "/images/functional-training.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/functional-training",
  },
  {
    id: "prescription-exercise",
    title: "Prescription Exercise",
    tag: "Therapy",
    image: "/images/prescription-exercise.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/prescription-exercise",
  },
  {
    id: "sports-massage",
    title: "Sports Massage",
    tag: "Therapy",
    image: "/images/sports-massage.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/sports-massage",
  },
  {
    id: "aquatherapy",
    title: "Aquatherapy",
    tag: "Therapy",
    image: "/images/aquatherapy.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/aquatherapy",
  },
  {
    id: "kalaripayattu",
    title: "Kalaripayattu",
    tag: "Therapy",
    image: "/images/kalaripayattu.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/kalaripayattu",
  },
  {
    id: "cranio-sacral",
    title: "Cranio Sacral Therapy",
    tag: "Therapy",
    image: "/images/cranio-sacral.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/cranio-sacral",
  },
  {
    id: "six-healing-sounds",
    title: "Six Healing Sounds",
    tag: "Therapy",
    image: "/images/six-healing-sounds.png",
    icon: "/icons/theraphy.svg",
    href: "/therapy/six-healing-sounds",
  },
];

/* -------------------------------------------------------------------------- */
/* Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    y: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const paragraphVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pillsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.16,
    },
  },
};

const pillVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.9,
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

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.14,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.94,
    filter: "blur(5px)",
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

/* -------------------------------------------------------------------------- */
/* Random selection helper                                                    */
/* -------------------------------------------------------------------------- */

function getRandomTherapies(
  therapies: TherapyItem[],
  count: number,
): TherapyItem[] {
  const shuffledTherapies = [...therapies];

  for (
    let index = shuffledTherapies.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledTherapies[index], shuffledTherapies[randomIndex]] = [
      shuffledTherapies[randomIndex],
      shuffledTherapies[index],
    ];
  }

  return shuffledTherapies.slice(0, count);
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function TherapyAboutSection({
  currentTherapyId,
  description,
  bestFor,
  className = "",
}: TherapyAboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const availableTherapies = useMemo(() => {
    return THERAPIES.filter(
      (therapy) => therapy.id !== currentTherapyId,
    );
  }, [currentTherapyId]);

  /*
   * The initial fixed list prevents a hydration mismatch.
   * After mounting, it changes to two random therapies.
   */
  const [otherTherapies, setOtherTherapies] = useState<TherapyItem[]>(
    () => availableTherapies.slice(0, 2),
  );

  useEffect(() => {
    setOtherTherapies(
      getRandomTherapies(availableTherapies, 2),
    );
  }, [availableTherapies]);

  return (
    <section
      className={`w-full overflow-hidden bg-[#ffff] ${className}`}
    >
      <div className="mx-auto w-full max-w-[636px] px-[19px] pb-[34px] pt-[10px] sm:px-[19px]">
        {/* About the Service */}
        <motion.div
          variants={shouldReduceMotion ? undefined : contentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.35,
            margin: "-20px 0px",
          }}
        >
          <motion.h2
            variants={
              shouldReduceMotion ? undefined : headingVariants
            }
            className="
              text-[19px]
              font-semibold
              leading-[1.4]
              text-[#222222]
              sm:text-[17px]
            "
          >
            About the Service
          </motion.h2>

          <motion.p
            variants={
              shouldReduceMotion ? undefined : paragraphVariants
            }
            className="
              mt-[14px]
              max-w-[600px]
              text-[15px]
              font-normal
              leading-[1.7]
              text-[#7a7a7a]
              sm:text-[15px]
            "
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Best For */}
        <motion.div
          variants={shouldReduceMotion ? undefined : contentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
            margin: "-25px 0px",
          }}
          className="mt-[27px]"
        >
          <motion.h3
            variants={
              shouldReduceMotion ? undefined : headingVariants
            }
            className="
              text-[19px]
              font-semibold
              leading-[1.4]
              text-[#222222]
              sm:text-[19px]
            "
          >
            Best For
          </motion.h3>

          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : pillsContainerVariants
            }
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              mt-[14px]
              flex
              flex-wrap
              gap-x-[12px]
              gap-y-[11px]
            "
          >
            {bestFor.map((item) => (
              <motion.span
                key={item}
                variants={
                  shouldReduceMotion ? undefined : pillVariants
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.035,
                        boxShadow:
                          "0 10px 24px rgba(15, 23, 42, 0.08)",
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  inline-flex
                  min-h-[35px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#eeeeee]
                  bg-white
                  px-[13px]
                  py-[8px]
                  text-[13px]
                  font-medium
                  leading-none
                  text-[#333333]
                  shadow-[0_7px_22px_rgba(15,23,42,0.035)]
                  sm:px-[15px]
                  sm:text-[12px]
                "
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Other Therapy */}
        <motion.div
          variants={shouldReduceMotion ? undefined : contentVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
            margin: "-25px 0px",
          }}
          className="mt-[28px]"
        >
          <motion.h3
            variants={
              shouldReduceMotion ? undefined : headingVariants
            }
            className="
              text-[19px]
              font-semibold
              leading-[1.4]
              text-[#222222]
              sm:text-[19px]
            "
          >
            Other Therapy
          </motion.h3>

          <motion.div
            variants={
              shouldReduceMotion
                ? undefined
                : cardsContainerVariants
            }
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
              margin: "-20px 0px",
            }}
            className="mt-[11px] grid grid-cols-2 gap-[13px]"
          >
            {otherTherapies.map((therapy) => (
              <motion.article
                key={therapy.id}
                variants={
                  shouldReduceMotion ? undefined : cardVariants
                }
                className="min-w-0"
              >
                <Link
                  href={therapy.href}
                  aria-label={`View ${therapy.title}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -5,
                            scale: 1.015,
                          }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.98,
                          }
                    }
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      relative
                      aspect-[1.62/1]
                      w-full
                      overflow-hidden
                      rounded-[11px]
                      bg-[#eeeeee]
                      shadow-[0_8px_24px_rgba(15,23,42,0.07)]
                    "
                  >
                    <Image
                      src={therapy.image}
                      alt={therapy.title}
                      fill
                      sizes="(max-width: 636px) 50vw, 300px"
                      className="
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.07]
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                    {/* Animated light effect */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        -left-[80%]
                        w-[45%]
                        -skew-x-12
                        bg-gradient-to-r
                        from-transparent
                        via-white/25
                        to-transparent
                        transition-all
                        duration-700
                        ease-out
                        group-hover:left-[130%]
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-[11px] ring-1 ring-inset ring-black/[0.04]" />
                  </motion.div>

                  <h4
                    className="
                      mt-[10px]
                      truncate
                      text-[14px]
                      font-semibold
                      leading-[1.35]
                      text-[#2c2c2c]
                      transition-colors
                      duration-300
                      group-hover:text-[#075bc4]
                      sm:text-[15px]
                    "
                  >
                    {therapy.title}
                  </h4>

                  <div className="mt-[6px] flex items-center gap-[5px]">
                    <div className="relative h-[13px] w-[13px] shrink-0 opacity-60">
                      <Image
                        src={therapy.icon}
                        alt=""
                        fill
                        sizes="13px"
                        aria-hidden="true"
                        className="object-contain"
                      />
                    </div>

                    <span className="text-[11px] font-normal leading-none text-[#999999] sm:text-[12px]">
                      {therapy.tag}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}