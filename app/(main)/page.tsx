import HeroSection from '@/components/sections/HeroSection'
import StatsStrip from '@/components/sections/StatsStrip'
import ModulesGrid from '@/components/sections/ModulesGrid'
import LiveScores from '@/components/sections/LiveScores'
import ToursSection from '@/components/sections/ToursSection'
import NationalTeam from '@/components/sections/NationalTeam'
import ClassifiedsPreview from '@/components/sections/ClassifiedsPreview'
import NoticeBoard from '@/components/sections/NoticeBoard'
import CouncilsSection from '@/components/sections/CouncilsSection'
import RegisterCTA from '@/components/sections/RegisterCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <ModulesGrid />
      <LiveScores />
      <ToursSection />
      <NationalTeam />
      <ClassifiedsPreview />
      <NoticeBoard />
      <CouncilsSection />
      <RegisterCTA />
    </>
  )
}
