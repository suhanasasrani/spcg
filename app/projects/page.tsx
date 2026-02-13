import { Projects } from "@/components/projects"
import { PageTransition } from "@/components/page-transition"
import { BackToHome } from "@/components/back-to-home"

export default function ProjectsPage() {
  return (
    <PageTransition variant="parallax">
      <BackToHome />
      <Projects />
    </PageTransition>
  )
}
