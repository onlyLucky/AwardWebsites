// ===== Home 组件 =====
// 对应源码 #home
// 包含所有 section 组件

import IntroSection from './intro'
import ToolboxSection from './toolbox'
import FeaturesGallerySection from './features-gallery'
import ModulesSection from './modules'
import SponsorsSection from './sponsors'
import GetStartedSection from './get-started'

export default function Home() {
  return (
    <main id="home" className="layout-container">
      <IntroSection />
      <ToolboxSection />
      <FeaturesGallerySection />
      <ModulesSection />
      <SponsorsSection />
      <GetStartedSection />
    </main>
  )
}
