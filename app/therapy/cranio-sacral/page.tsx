import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Cranio Sacral Therapy information                                          */
/* -------------------------------------------------------------------------- */

const cranioSacralDetails: TherapyInfoItem[] = [
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
    iconAlt: "Individual Cranio Sacral Therapy session icon",
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

const cranioSacralBestFor: string[] = [
  "Tension Headaches",
  "Stress Management",
  "Chronic Fatigue",
  "Muscle Tension",
  "Emotional Wellness",
  "Relaxation Therapy",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function CranioSacralPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/cranio-sacral-banner.png"
        alt="Therapist providing gentle Cranio Sacral Therapy treatment"
        priority
      />

      <TherapyInfoCard
        title="Cranio Sacral Therapy (CST)"
        description="Gentle Touch. Deep Healing. Lasting Relief."
        items={cranioSacralDetails}
      />

      <TherapyAboutSection
        currentTherapyId="cranio-sacral"
        description="CST is a gentle manual therapy designed to release restrictions within the craniosacral system. Through light-touch techniques, our therapists help relieve tension, improve circulation of cerebrospinal fluid, and support physical and emotional well-being."
        bestFor={cranioSacralBestFor}
      />
    </main>
  );
}