import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Physiotherapy information                                                  */
/* -------------------------------------------------------------------------- */

const physiotherapyDetails: TherapyInfoItem[] = [
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

const physiotherapyBestFor: string[] = [
  "Chronic Pain",
  "Sports Injuries",
  "Joint Disorders",
  "Post-Operative Care",
  "Muscle Weakness",
  "Balance Training",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PhysiotherapyPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/physiotherapy-banner.png"
        alt="Physiotherapist helping a patient improve movement and recovery"
        priority
      />

      <TherapyInfoCard
        title="Physiotherapy"
        description="Recover Stronger! Move Freely! Live Comfortably!"
        items={physiotherapyDetails}
      />

      <TherapyAboutSection
        currentTherapyId="physiotherapy"
        description="Our physiotherapy sessions are designed to reduce pain, improve flexibility, and restore movement. Using personalized treatment techniques and guided rehabilitation, our experts help you recover safely and regain confidence in your daily activities."
        bestFor={physiotherapyBestFor}
      />
    </main>
  );
}