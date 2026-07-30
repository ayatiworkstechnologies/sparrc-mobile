import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Kalari Therapy information                                                 */
/* -------------------------------------------------------------------------- */

const kalariTherapyDetails: TherapyInfoItem[] = [
  {
    id: 1,
    icon: "/icons/duration.svg",
    iconAlt: "Duration icon",
    label: "Duration",
    value: "60 mins",
  },
  {
    id: 2,
    icon: "/icons/session-type.svg",
    iconAlt: "Session type icon",
    label: "Session Type",
    value: "Training",
  },
  {
    id: 3,
    icon: "/icons/groups.svg",
    iconAlt: "Individual Kalari Therapy session icon",
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

const kalariTherapyBestFor: string[] = [
  "Agility Training",
  "Muscle Conditioning",
  "Flexibility Enhancement",
  "Focus & Concentration",
  "Body Awareness",
  "Functional Movement",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function KalaripayattuPage() {
  return (
    <main className="w-full overflow-hidden pt-[75px]">
      <TherapyBanner
        src="/images/kalaripayattu-banner.png"
        alt="Participant practicing guided Kalari Therapy movements"
        priority
      />

      <TherapyInfoCard
        title="Kalari Therapy"
        description="Strengthen Your Body. Sharpen Your Mind."
        items={kalariTherapyDetails}
      />

      <TherapyAboutSection
        currentTherapyId="kalaripayattu"
        description="Kalari Therapy is a holistic movement program that develops physical strength, agility, flexibility, and mental focus through structured training. Every session is designed to improve movement quality, body control, and overall wellness."
        bestFor={kalariTherapyBestFor}
      />
    </main>
  );
}