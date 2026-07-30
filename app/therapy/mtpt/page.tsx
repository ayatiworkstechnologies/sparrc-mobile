import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Therapy information                                                        */
/* -------------------------------------------------------------------------- */

const mtptDetails: TherapyInfoItem[] = [
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

const mtptBestFor: string[] = [
  "Neck & Shoulder Pain",
  "Chronic Muscle Pain",
  "Tension Headaches",
  "Back Pain",
  "Sports Injuries",
  "Myofascial Pain Syndrome",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function MtptPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/mtpt-banner.png"
        alt="Therapist providing Myofascial Trigger Point Therapy"
        priority
      />      

      <TherapyInfoCard
        title="Myofascial Trigger Point Therapy"
        description="Relieve Pain. Release Tension. Restore Movement."
        items={mtptDetails}
      />

      <TherapyAboutSection
        currentTherapyId="mtpt"
        description="Myofascial Trigger Point Therapy (MTPT) is a specialized treatment that targets painful muscle knots, commonly known as trigger points. Our expert therapists use precise hands-on techniques to reduce muscle tension."
        bestFor={mtptBestFor}
      />
    </main>
  );
}