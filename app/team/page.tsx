import { Team } from "@/components/team"
import { PageTransition } from "@/components/page-transition"
import { BackToHome } from "@/components/back-to-home"

export default function TeamPage() {
  return (
    <PageTransition variant="sequential">
      <BackToHome />
      <Team />
    </PageTransition>
  )
}
