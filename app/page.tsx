import Image from "next/image";
import Hero from "@/components/frontpage/Hero";
import Howitworks from "@/components/frontpage/Howitworks";
import AnalysisPreview from "@/components/frontpage/AnalysisPreview";
import Pricing from "@/components/frontpage/Pricing";

export default function Home() {
  return (
    <div >
      <Hero />
      <Howitworks />
      <AnalysisPreview />
      <Pricing />
    </div>
  );
}
