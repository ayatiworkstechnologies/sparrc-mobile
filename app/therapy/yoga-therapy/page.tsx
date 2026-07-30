import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Yoga Therapy information                                                   */
/* -------------------------------------------------------------------------- */

const yogaTherapyDetails: TherapyInfoItem[] = [
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
    value: "Treatment",
  },
  {
    id: 3,
    icon: "/icons/groups.svg",
    iconAlt: "Individual session icon",
    label: "Format",
    value: "Group / Individual",
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

const yogaTherapyBestFor: string[] = [
  "Pain Relief",
  "Better Flexibility",
  "Improved Posture",
  "Stress Relief",
  "Better Sleep",
  "Mental Wellness",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function YogaTherapyPage() {
  return (
    <main className="w-full overflow-hidden pt-[75px]">
      <TherapyBanner
        src="/images/yoga-therapy-banner.png"
        alt="Guided yoga therapy session for physical and mental well-being"
        priority
      />

      <TherapyInfoCard
        title="Yoga Therapy"
        description="Breathe Better! Live Healthier!"
        items={yogaTherapyDetails}
      />

      <TherapyAboutSection
        currentTherapyId="yoga-therapy"
        description="Yoga Therapy combines guided breathing, gentle postures, meditation, and relaxation techniques to support both physical and mental well-being. Our personalized sessions help improve flexibility, reduce stress, manage pain, and promote overall health through a holistic approach."
        bestFor={yogaTherapyBestFor}
      />
    </main>
  );
}