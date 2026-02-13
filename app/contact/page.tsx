import { Contact } from "@/components/contact"
import { PageTransition } from "@/components/page-transition"

export default function ContactPage() {
  return (
    <PageTransition variant="zoomOut">
      <Contact />
    </PageTransition>
  )
}
