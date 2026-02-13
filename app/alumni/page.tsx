import { Alumni } from "@/components/alumni"
import { PageTransition } from "@/components/page-transition"

export default function AlumniPage() {
  return (
    <PageTransition variant="slideLeft">
      <Alumni />
    </PageTransition>
  )
}
