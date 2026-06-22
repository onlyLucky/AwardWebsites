import { features } from '../../data/features'
import FeatureCard from './FeatureCard'

export default function Features() {
  return (
    <section className="animejs-features">
      {/* 区域标题 */}
      <div className="animejs-features__header">
        <h2 className="animejs-features__title">
          The complete{' '}
          <br />
          animator's toolbox
        </h2>
        <p className="animejs-features__subtitle">
          Break free from browser limitations and animate anything on the web
          with a single API.
        </p>
      </div>

      {/* 特性卡片列表 */}
      <div className="animejs-features__grid">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
