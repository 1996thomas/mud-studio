import GridMotion from '@/app/components/GridMotion'
import Grainient from '@/app/components/Grainient'
import { NewsletterForm } from '@/app/components/NewsletterForm'

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center p-4 justify-center bg-[#0a0a0a] overflow-hidden ">
      {/* Layer 1 — scrolling logo grid */}
      <GridMotion gradientColor="#1C1C1C" />

      {/* Layer 2 — grainy animated overlay */}
      <Grainient
        blendAngle={-9}
        grainAmount={0.35}
        grainAnimated
        saturation={0.7}
        contrast={1.3}
        opacity={0.45}
        color1="#FF9FFC"
        color2="#5227FF"
        color3="#0a0a0a"
      />

      {/* Layer 3 — glass newsletter form */}
      <div className="relative z-10 w-full max-w-sm">
        <NewsletterForm />
      </div>
    </div>
  )
}
