import { About } from "@/components/about"
import { PageTransition } from "@/components/page-transition"

export default function AboutPage() {
  return (
    <PageTransition variant="slideUp">
      <About />
    </PageTransition>
  )
}
