import BreadcrumbHeader from "../../component/BreadcrumbHeader";
import GetInTouchSection from "../../component/Contactpage/GetInTouchSection";
import OurLocationSection from "../../component/Contactpage/OurLocationSection";



export default function Contactpage() {
  return (
    <main className="pt-[55px]">
       <BreadcrumbHeader />

       <GetInTouchSection />

       <OurLocationSection />
    </main>
  );
}