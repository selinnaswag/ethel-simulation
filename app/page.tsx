import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ThirtySecondDemo } from "@/components/thirty-second-demo"
import { SummaryTypes } from "@/components/summary-types"
import { AskEthel } from "@/components/ask-ethel"
import { RoiCalculator } from "@/components/roi-calculator"
import { HowItWorks } from "@/components/how-it-works"
import { ModesSection } from "@/components/modes-section"
import { AdoptionCta, SiteFooter } from "@/components/adoption-cta"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ThirtySecondDemo />
      <SummaryTypes />
      <AskEthel />
      <RoiCalculator />
      <HowItWorks />
      <ModesSection />
      <AdoptionCta />
      <SiteFooter />
    </main>
  )
}
