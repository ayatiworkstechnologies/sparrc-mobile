import OurTeamSlider from "../component/Homepage/OurTeamSlider";
import RecoveryJourneySection from "../component/Homepage/Recoveryjourneysection";
import TherapiesSection from "../component/Homepage/TherapiesSection";

export default function Home() {
  return (
    <main className="pt-[55px]">
      <TherapiesSection />

      <RecoveryJourneySection />

      <OurTeamSlider />
    </main>
  );
}