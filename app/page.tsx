import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { NavigationPortals } from "@/components/navigation-portals"
import { Partners } from "@/components/partners"
import { SectionDivider } from "@/components/section-divider"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"

export default function HomePage() {
  return (
    <div>
      <div id="home">
        <Hero />
      </div>
      <SectionDivider delay={0} />
      <div id="about">
        <About />
      </div>
      <SectionDivider delay={0.2} />
      <div id="portals">
        <NavigationPortals />
      </div>
      <SectionDivider delay={0.4} />
      <div id="partners">
        <Partners />
      </div>
      <SectionDivider delay={0.4} />
      <div id="testimonials">
        <Testimonials />
      </div>
      <SectionDivider delay={0.6} />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  )
}
