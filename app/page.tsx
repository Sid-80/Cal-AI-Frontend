import Hero from "@/components/home/hero";
import { NavbarDemo } from "@/components/shared/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavbarDemo />
      <div className="mx-auto p-8 pt-24 w-full">
        <Hero />
      </div>
    </>
  );
}
