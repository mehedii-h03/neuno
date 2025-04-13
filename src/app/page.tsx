import Image from "next/image";
// Gradient
import BgGradientSvg from "@/assets/gradients/BgGradient.svg";

// Components
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none md:-top-[100px]">
        <Image
          src={BgGradientSvg}
          alt="Background Gradient"
          fill
          priority
          className="object-cover"
        />
      </div>
      <Navbar />
      <main className="relative z-10 h-[200vh]"></main>
    </>
  );
}
