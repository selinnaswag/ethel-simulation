import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { EthelPlayground } from "@/components/ethel-playground"
import { PainPointQuiz } from "@/components/pain-point-quiz"
import { HowItWorks } from "@/components/how-it-works"
import { ModesSection } from "@/components/modes-section"
import { SiteFooter } from "@/components/adoption-cta"
import { ContactCta } from "@/components/contact-cta"
import { TableOfContents } from "@/components/table-of-contents"

export default function Page() {
  return (
    <main>
      <ContactCta />
      <TableOfContents />
      <SiteHeader />
      <HeroSection />
      <EthelPlayground />
      <PainPointQuiz />
      <HowItWorks />
      <ModesSection />
      <SiteFooter />
    </main>
  )
}
