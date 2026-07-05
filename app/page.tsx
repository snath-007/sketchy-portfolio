import FeaturedLab from "@/components/home/FeaturedLab/FeaturedLab";
import FeaturedWork from "@/components/home/FeaturedWork/FeaturedWork";
import Hero from "@/components/home/Hero/Hero";
import LatestEssays from "@/components/home/LatestEssays/LatestEssays";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <FeaturedLab />
      <LatestEssays />
    </main>
  );
}
