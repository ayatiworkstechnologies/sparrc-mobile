import AboutBanner from "../../component/Aboutpage/AboutBanner";
import OurImpactSection from "../../component/Aboutpage/OurImpactSection";
import WhatWeDoSection from "../../component/Aboutpage/WhatWeDoSection";
import WhoWeAreSection from "../../component/Aboutpage/WhoWeAreSection";
import BreadcrumbHeader from "../../component/BreadcrumbHeader";




export default function Aboutpage() {
  return (
    <main className="pt-[55px]">
       <BreadcrumbHeader />

       <AboutBanner />

       <WhoWeAreSection />

       <OurImpactSection />

       <WhatWeDoSection />

    </main>
  );
}