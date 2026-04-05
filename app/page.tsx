import Image from "next/image";
import Hero from "@/components/frontpage/Hero";
import Howitworks from "@/components/frontpage/Howitworks";
import AnalysisPreview from "@/components/frontpage/AnalysisPreview";

export default function Home() {
  return (
    <div >
      <Hero />
      <Howitworks />
      <AnalysisPreview />
    </div>
  );
}
