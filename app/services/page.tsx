import { Services } from "@/components/services"
import { PageTransition } from "@/components/page-transition"
import { BackToHome } from "@/components/back-to-home"

export default function ServicesPage() {
  return (
    <PageTransition variant="slideRight">
      <BackToHome />
      <Services />
    </PageTransition>
  )
}
