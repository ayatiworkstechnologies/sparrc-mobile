import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* PEMF information                                                           */
/* -------------------------------------------------------------------------- */

const pemfDetails: TherapyInfoItem[] = [
  {
    id: 1,
    icon: "/icons/duration.svg",
    iconAlt: "Duration icon",
    label: "Duration",
    value: "30–45 mins",
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

const pemfBestFor: string[] = [
  "Chronic Pain",
  "Osteoarthritis",
  "Sports Recovery",
  "Post-Surgical Healing",
  "Nerve Pain",
  "Muscle Fatigue",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PemfPage() {
  return (
    <main className="w-full overflow-hidden pt-[55px]">
      <TherapyBanner
        src="/images/pemf-banner.png"
        alt="Patient receiving Pulsed Electromagnetic Field Therapy"
        priority
      />

      <TherapyInfoCard
        title="PEMF Therapy"
        description="Heal Naturally. Recharge Your Body. Move Without Pain."
        items={pemfDetails}
      />

      <TherapyAboutSection
        currentTherapyId="pemf"
        description="Experience advanced electromagnetic therapy designed to relieve pain, accelerate healing, and improve overall physical function. Our PEMF sessions are customized to support recovery, reduce inflammation, and enhance your body's natural regenerative abilities."
        bestFor={pemfBestFor}
      />
    </main>
  );
}