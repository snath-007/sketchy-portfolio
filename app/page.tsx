import ContactCTA from "@/components/home/ContactCTA/ContactCTA";
import FeaturedLab from "@/components/home/FeaturedLab/FeaturedLab";
import FeaturedWork from "@/components/home/FeaturedWork/FeaturedWork";
import Hero from "@/components/home/Hero/Hero";
import LatestEssays from "@/components/home/LatestEssays/LatestEssays";
import VisualIndex from "@/components/home/VisualIndex/VisualIndex";

export default function Home() {
  return (
    <main>
      <Hero />
      <VisualIndex />
      <FeaturedWork />
      <FeaturedLab />
      <LatestEssays />
      <ContactCTA />
    </main>
  );
}
