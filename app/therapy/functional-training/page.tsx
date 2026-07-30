import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Functional Training information                                            */
/* -------------------------------------------------------------------------- */

const functionalTrainingDetails: TherapyInfoItem[] = [
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
    iconAlt: "Individual training icon",
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

const functionalTrainingBestFor: string[] = [
  "Everyday Movement",
  "Core Stability",
  "Balance & Coordination",
  "Strength Building",
  "Injury Prevention",
  "Active Lifestyle",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function FunctionalTrainingPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/functional-training-banner.png"
        alt="Person performing guided functional training exercises"
        priority
      />

      <TherapyInfoCard
        title="Functional Training"
        description="Train for Life. Move with Confidence."
        items={functionalTrainingDetails}
      />

      <TherapyAboutSection
        currentTherapyId="functional-training"
        description="Functional Training is designed to improve the way you move in everyday life. Through personalized exercises, our therapists help build strength, enhance balance, improve flexibility, and increase endurance, making daily activities easier"
        bestFor={functionalTrainingBestFor}
      />
    </main>
  );
}