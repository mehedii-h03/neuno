import Image from "next/image";
// Gradient
import BgGradientSvg from "@/assets/gradients/BgGradient.svg";

// Components
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProfileSidebar from "@/components/landing/ProfileSidebar";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none md:-top-[100px] -right-[300px]">
        <Image
          src={BgGradientSvg}
          alt="Background Gradient"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Profile sidebar component */}
      <ProfileSidebar delay={3000} vibrateInterval={5000} />

      <Navbar />
      <main className="relative z-10 mt-[100px] lg:mt-[160px] h-[200vh]">
        <Hero />
      </main>
    </>
  );
}
