import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Group Therapy information                                                  */
/* -------------------------------------------------------------------------- */

const groupTherapyDetails: TherapyInfoItem[] = [
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
    value: "Wellness Program",
  },
  {
    id: 3,
    icon: "/icons/groups.svg",
    iconAlt: "Group session icon",
    label: "Format",
    value: "Group",
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

const groupTherapyBestFor: string[] = [
  "Stress Relief",
  "Improving Mobility",
  "Social Connection",
  "Building Confidence",
  "Maintaining Fitness",
  "Mental Wellness",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function GroupTherapyPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/group-therapy-banner.png"
        alt="People participating in a guided group therapy session"
        priority
      />

      <TherapyInfoCard
        title="Group Therapy"
        description="Connect. Participate. Grow Together."
        items={groupTherapyDetails}
      />

      <TherapyAboutSection
        currentTherapyId="group-therapy"
        description="Group Therapy brings people together to improve physical and mental well-being through guided activities, movement sessions, and social interaction. These sessions help reduce stress, improve fitness, build confidence"
        bestFor={groupTherapyBestFor}
      />
    </main>
  );
}