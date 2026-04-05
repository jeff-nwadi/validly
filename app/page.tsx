import Image from "next/image";
import Hero from "@/components/frontpage/Hero";
import Howitworks from "@/components/frontpage/Howitworks";

export default function Home() {
  return (
    <div >
      <Hero />
      <Howitworks />
    </div>
  );
}
