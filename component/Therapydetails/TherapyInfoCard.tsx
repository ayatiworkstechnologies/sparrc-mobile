"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

export type TherapyInfoItem = {
  id: number | string;
  icon: string;
  iconAlt?: string;
  label: string;
  value: string;
};

type TherapyInfoCardProps = {
  title: string;
  description: string;
  items: TherapyInfoItem[];
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    y: 10,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const descriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay: 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.97,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.11,
      delayChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.88,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.65,
    rotate: -8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 14,
      mass: 0.8,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function TherapyInfoCard({
  title,
  description,
  items,
  className = "",
}: TherapyInfoCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : sectionVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
        margin: "-30px 0px",
      }}
      className={`w-full bg-[#ffffff] ${className}`}
    >
      <div className="mx-auto w-full max-w-[636px] px-[19px] pb-[21px] pt-[17px]">
        {/* Heading */}
        <div>
          <motion.h1
            variants={shouldReduceMotion ? undefined : headingVariants}
            className="
              max-w-[580px]
              text-[25px]
              font-semibold
              leading-[1.15]
              tracking-[-1px]
              text-[#050505]
              min-[500px]:text-[38px]
            "
          >
            {title}
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : descriptionVariants}
            className="
              mt-[20px]
              max-w-[580px]
              text-[15px]
              font-normal
              leading-[1.55]
              text-[#242424]
              min-[500px]:text-[18px]
            "
          >
            {description}
          </motion.p>
        </div>

        {/* Details card */}
        <motion.div
          variants={shouldReduceMotion ? undefined : cardVariants}
          className="
            mt-[20px]
            grid
            min-h-[121px]
            w-full
            grid-cols-4
            items-center
            overflow-hidden
            rounded-[24px]
            bg-[#f5f5f5]
            px-[6px]
            py-[25px]
            min-[500px]:px-[16px]
          "
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="
                group
                flex
                min-w-0
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              {/* Icon background */}
              <motion.div
                variants={shouldReduceMotion ? undefined : iconVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.06,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.96,
                      }
                }
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  flex
                  h-[52px]
                  w-[52px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fafafa]
                  shadow-[0_5px_18px_rgba(23,78,166,0.035)]
                  min-[500px]:h-[60px]
                  min-[500px]:w-[60px]
                "
              >
                <Image
                  src={item.icon}
                  alt={item.iconAlt ?? item.label}
                  width={36}
                  height={36}
                  className="
                    h-[31px]
                    w-[31px]
                    object-contain
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-105
                    min-[500px]:h-[36px]
                    min-[500px]:w-[36px]
                  "
                />
              </motion.div>

              {/* Label */}
              <motion.p
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="
                  mt-[16px]
                  w-full
                  whitespace-nowrap
                  px-[1px]
                  text-[13px]
                  font-medium
                  leading-[1.3]
                  text-[#5d5d5d]
                  min-[390px]:text-[13px]
                  min-[500px]:text-[14px]
                "
              >
                {item.label}
              </motion.p>

              {/* Value */}
              <motion.p
                variants={shouldReduceMotion ? undefined : itemVariants}
                className="
                  mt-[14px]
                  w-full
                  whitespace-nowrap
                  px-[1px]
                  text-[13px]
                  font-semibold
                  leading-[1.3]
                  text-[#111111]
                  min-[390px]:text-[13px]
                  min-[500px]:text-[15px]
                "
              >
                {item.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}