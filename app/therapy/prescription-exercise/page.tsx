import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Prescription Exercise information                                          */
/* -------------------------------------------------------------------------- */

const prescriptionExerciseDetails: TherapyInfoItem[] = [
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
    value: "Exercise",
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

const prescriptionExerciseBestFor: string[] = [
  "Injury Rehabilitation",
  "Chronic Pain",
  "Muscle Strengthening",
  "Balance Training",
  "Mobility Enhancement",
  "Physical Conditioning",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PrescriptionExercisePage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/prescription-exercise-banner.png"
        alt="Specialist guiding a patient through prescription exercise therapy"
        priority
      />

      <TherapyInfoCard
        title="Prescription Exercise"
        description="Your Exercise Plan. Your Recovery. Your Results."
        items={prescriptionExerciseDetails}
      />

      <TherapyAboutSection
        currentTherapyId="prescription-exercise"
        description="Prescription Exercise is a customized rehabilitation program developed by our specialists to match your medical condition, physical abilities, and recovery goals. Through structured exercises and expert guidance, we help improve mobility, build strength, reduce pain, and support long-term health."
        bestFor={prescriptionExerciseBestFor}
      />
    </main>
  );
}