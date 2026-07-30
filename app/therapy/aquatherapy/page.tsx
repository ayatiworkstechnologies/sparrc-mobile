import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Aquatherapy information                                                    */
/* -------------------------------------------------------------------------- */

const aquatherapyDetails: TherapyInfoItem[] = [
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
    value: "Aquatic Therapy",
  },
  {
    id: 3,
    icon: "/icons/format-1.svg",
    iconAlt: "Individual aquatherapy session icon",
    label: "Format",
    value: "Supervised",
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

const aquatherapyBestFor: string[] = [
  "Joint Mobility",
  "Arthritis Care",
  "Muscle Recovery",
  "Balance Improvement",
  "Sports Rehabilitation",
  "Physical Wellness",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AquatherapyPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/aquatherapy-banner.png"
        alt="Patient participating in a guided aquatherapy rehabilitation session"
        priority
      />

      <TherapyInfoCard
        title="Aquatherapy"
        description="Experience the Healing Power of Water."
        items={aquatherapyDetails}
      />

      <TherapyAboutSection
        currentTherapyId="aquatherapy"
        description="Aquatherapy is a specialized water-based rehabilitation program that uses the natural buoyancy and resistance of water to support pain-free movement. It helps improve strength, flexibility, balance, and endurance while reducing stress on joints and muscles. Every session is customized to help you recover comfortably and confidently."
        bestFor={aquatherapyBestFor}
      />
    </main>
  );
}