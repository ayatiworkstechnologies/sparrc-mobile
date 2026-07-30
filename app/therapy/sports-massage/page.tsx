import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Sports Massage information                                                 */
/* -------------------------------------------------------------------------- */

const sportsMassageDetails: TherapyInfoItem[] = [
  {
    id: 1,
    icon: "/icons/duration.svg",
    iconAlt: "Duration icon",
    label: "Duration",
    value: "45–60 mins",
  },
  {
    id: 2,
    icon: "/icons/session-type.svg",
    iconAlt: "Session type icon",
    label: "Session Type",
    value: "Rehabilitation",
  },
  {
    id: 3,
    icon: "/icons/format.svg",
    iconAlt: "Individual session icon",
    label: "Format",
    value: "Individual",
  },
  {
    id: 4,
    icon: "/icons/consultation.svg",
    iconAlt: "Clinic consultation icon",
    label: "Consultation",
    value: "In-Clinic",
  },
];

/* -------------------------------------------------------------------------- */
/* Best-for categories                                                        */
/* -------------------------------------------------------------------------- */

const sportsMassageBestFor: string[] = [
  "Competitive Athletes",
  "Fitness Enthusiasts",
  "Running & Cycling Recovery",
  "Muscle Relaxation",
  "Injury Rehabilitation",
  "Performance Maintenance",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SportsMassagePage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/sports-massage-banner.png"
        alt="Therapist providing sports massage treatment to an athlete"
        priority
      />

      <TherapyInfoCard
        title="Sports Massage"
        description="Keep Moving. Keep Competing. Keep Improving."
        items={sportsMassageDetails}
      />

      <TherapyAboutSection
        currentTherapyId="sports-massage"
        description="Designed for athletes and active individuals, Sports Massage helps optimize muscle health through specialized hands-on techniques. It reduces soreness, improves flexibility, supports injury recovery, and prepares your body for better performance."
        bestFor={sportsMassageBestFor}
      />
    </main>
  );
}