"use client";

import Image from "next/image";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type TeamMember = {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sujatha Pugazhendi",
    designation: "Founder & CEO",
    description:
      "Sujatha is a trained Physiotherapist who wished to take Sports Medicine to all...",
    // image: "/images/sujatha-pugazhendi.png",
     image: "/images/example.png",
  },
  {
    id: 2,
    name: "Dr. Kannan Pugazhendi",
    designation: "Co-Founder : SPARRC",
    description:
      "Dr. Kannan Pugazhendi, graduated from Madras Medical College in...",
    // image: "/images/dr-kannan-pugazhendi.png",
    image: "/images/example.png",
  },
  {
    id: 3,
    name: "Ganesh",
    designation: "CTO",
    description:
      "Ganesh has technology background and joined SPARRC as the CTO in 2012, now heading our...",
    // image: "/images/ganesh.png",
    image: "/images/example.png",
  },
  {
    id: 4,
    name: "Sumitha",
    designation: "General Manager",
    description:
      "Sumitha’s transformative and rewarding journey with SPARRC began in 2012 as physiotherapist...",
    // image: "/images/sumitha.png",
    image: "/images/example.png",
  },
  {
    id: 5,
    name: "Dr Aravind",
    designation: "Primary Care Physician",
    description:
      "Dr. Aravind is a Primary Care Physician, currently pursuing his fellowship in Fitness and...",
    // image: "/images/dr-aravind.png",
    image: "/images/example.png",
  },
];

export default function OurTeamSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goToNext = useCallback(() => {
    setDirection(1);

    setActiveIndex((currentIndex) =>
      currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1
    );
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);

    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1
    );
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -60) {
      goToNext();
      return;
    }

    if (info.offset.x > 60) {
      goToPrevious();
    }
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const sliderInterval = window.setInterval(() => {
      goToNext();
    }, 4000);

    return () => window.clearInterval(sliderInterval);
  }, [goToNext, isPaused]);

  const activeMember = teamMembers[activeIndex];

  return (
    <section className="w-full overflow-hidden bg-white py-6 sm:py-10">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-7 text-[28px] font-semibold leading-none tracking-[-0.7px] text-black sm:text-[34px]"
        >
          Our Team
        </motion.h2>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative min-h-[180px] overflow-hidden rounded-[19px] sm:min-h-[210px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={activeMember.id}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 80 : -80,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -80 : 80,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                className="
                  absolute inset-0 flex cursor-grab items-center
                  overflow-hidden rounded-[19px]
                  bg-[linear-gradient(135deg,#210393_0%,#1334bb_42%,#0086dc_100%)]
                  px-6 py-7 shadow-[0_16px_40px_rgba(25,45,160,0.18)]
                  active:cursor-grabbing
                  sm:px-9 sm:py-8
                "
              >
                {/* Decorative background glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-[230px] w-[230px] rounded-full bg-white/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 -left-10 h-[200px] w-[200px] rounded-full bg-[#210393]/45 blur-3xl" />

                <div className="relative z-10 flex w-full items-center gap-6 sm:gap-9">
                  {/* Profile image */}
                  <div className="relative h-[91px] w-[82px] shrink-0 overflow-hidden rounded-[8px] bg-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] sm:h-[125px] sm:w-[112px]">
                    <Image
                      src={activeMember.image}
                      alt={activeMember.name}
                      fill
                      priority
                      draggable={false}
                      sizes="(max-width: 640px) 82px, 112px"
                      className="pointer-events-none select-none object-cover object-top"
                    />
                  </div>

                  {/* Team content */}
                  <div className="min-w-0 flex-1 text-white">
                    <h3 className="truncate text-[18px] font-semibold leading-tight tracking-[-0.2px] sm:text-[24px]">
                      {activeMember.name}
                    </h3>

                    <p className="mt-1.5 text-[15px] font-medium leading-tight text-white/95 sm:mt-2 sm:text-[19px]">
                      {activeMember.designation}
                    </p>

                    <p className="mt-3 line-clamp-2 max-w-[720px] text-[14px] font-normal leading-[1.35] text-white/90 sm:mt-4 sm:text-[17px] sm:leading-[1.45]">
                      {activeMember.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Slider dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {teamMembers.map((member, index) => (
              <button
                key={member.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`View ${member.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-[7px] rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-7 bg-[#210393]"
                    : "w-[7px] bg-[#d8dae3] hover:bg-[#9da1b1]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}