import TherapyBanner from "../../../component/Therapydetails/TherapyBanner";

import TherapyInfoCard, {
  type TherapyInfoItem,
} from "../../../component/Therapydetails/TherapyInfoCard";

import TherapyAboutSection from "../../../component/Therapydetails/TherapyAboutSection";

/* -------------------------------------------------------------------------- */
/* Six Healing Sounds information                                             */
/* -------------------------------------------------------------------------- */

const sixHealingSoundsDetails: TherapyInfoItem[] = [
  {
    id: 1,
    icon: "/icons/duration.svg",
    iconAlt: "Duration icon",
    label: "Duration",
    value: "45 mins",
  },
  {
    id: 2,
    icon: "/icons/session-type.svg",
    iconAlt: "Session type icon",
    label: "Session Type",
    value: "Therapy",
  },
  {
    id: 3,
    icon: "/icons/format.svg",
    iconAlt: "Individual sound healing session icon",
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

const sixHealingSoundsBestFor: string[] = [
  "Stress Relief",
  "Better Sleep",
  "Emotional Balance",
  "Mindfulness Practice",
  "Fatigue Recovery",
  "Inner Calm",
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SixHealingSoundsPage() {
  return (
    <main className="w-full overflow-hidden pt-[70px]">
      <TherapyBanner
        src="/images/six-healing-sounds-banner.png"
        alt="Participant experiencing a guided Six Healing Sounds session"
        priority
      />

      <TherapyInfoCard
        title="Six Healing Sounds"
        description="Find Calm. Feel Balanced. Heal Naturally."
        items={sixHealingSoundsDetails}
      />

      <TherapyAboutSection
        currentTherapyId="six-healing-sounds"
        description="Experience the healing power of sound through carefully tuned vibrations that relax the mind and body. Our Sound Healing sessions help release tension, improve focus, enhance emotional balance, and create a deep sense of peace and relaxation."
        bestFor={sixHealingSoundsBestFor}
      />
    </main>
  );
}