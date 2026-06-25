import GridMotion from '@/app/components/GridMotion'
import Grainient from '@/app/components/Grainient'
import { NewsletterForm } from '@/app/components/NewsletterForm'
import { config } from '@/app/config'

const { grain, page } = config

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center p-4 justify-center overflow-hidden"
      style={{ background: page.background }}
    >
      {/* Layer 1 — scrolling logo grid */}
      <GridMotion />

      {/* Layer 2 — grainy animated overlay */}
      <Grainient
        blendAngle={grain.blendAngle}
        blendSoftness={grain.blendSoftness}
        grainAmount={grain.grainAmount}
        grainAnimated={grain.grainAnimated}
        saturation={grain.saturation}
        contrast={grain.contrast}
        opacity={grain.opacity}
        timeSpeed={grain.timeSpeed}
        warpStrength={grain.warpStrength}
        warpSpeed={grain.warpSpeed}
        color1={grain.color1}
        color2={grain.color2}
        color3={grain.color3}
      />

      {/* Layer 3 — glass newsletter form */}
      <div className="relative z-10 w-full max-w-sm">
        <NewsletterForm />
      </div>
    </div>
  )
}
