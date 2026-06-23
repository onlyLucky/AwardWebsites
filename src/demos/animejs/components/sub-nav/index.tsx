// ===== Sub Nav 组件 =====
// 对应源码 sub-nav
// 包含滚动进度条和代码片段展示

export default function SubNav() {
  return (
    <div className="sub-nav">
      {/* 滚动进度条 */}
      <div className="home-progress-card">
        <div className="scroll-bar">
          <div className="scroll-cursor"></div>
          <div className="scroll-cursor-ghost scroll-cursor"></div>
        </div>
      </div>

      {/* 代码片段: Intuitive API */}
      <pre data-card="intuitive">
        <code>
{`animate('.square', {
  rotate: 90,
  loop: true,
  ease: 'inOutExpo',
});`}
        </code>
      </pre>

      {/* 代码片段: Composition */}
      <pre data-card="composition">
        <code>
{`animate('.shape', {
  x: random(-100, 100),
  y: random(-100, 100),
  rotate: random(-180, 180),
  duration: random(500, 1000),
  composition: 'blend',
});`}
        </code>
      </pre>

      {/* 代码片段: Scroll */}
      <pre data-card="scroll">
        <code>
{`animate(createDrawable('path'), {
  draw: ['0 0', '0 1', '1 1'],
  delay: stagger(40),
  ease: 'inOut(3)',
  autoplay: onScroll({ sync: true }),
});`}
        </code>
      </pre>

      {/* 代码片段: Staggering */}
      <pre data-card="staggering">
        <code>
{`const options = {
  grid: [13, 13],
  from: 'center',
};

createTimeline()
  .add('.dot', {
    scale: stagger([1.1, .75], options),
    ease: 'inOutQuad',
  }, stagger(200, options));`}
        </code>
      </pre>

      {/* 代码片段: SVG Utils */}
      <pre data-card="svgUtils">
        <code>
{`animate('.car', {
  ...createMotionPath('.circuit'),
});

animate(createDrawable('.circuit'), {
  draw: '0 1',
});

animate('.circuit-a', {
  d: morphTo('.circuit-b'),
});`}
        </code>
      </pre>

      {/* 代码片段: Draggable */}
      <pre data-card="draggable">
        <code>
{`createDraggable('.circle', {
  releaseEase: createSpring({
    stiffness: 120,
    damping: 6,
  })
});`}
        </code>
      </pre>

      {/* 代码片段: Clockwork */}
      <pre data-card="clockwork">
        <code>
{`createTimeline()
  .add('.tick', {
    y: '-=6',
    duration: 50,
  }, stagger(10))
  .add('.ticker', {
    rotate: 360,
    duration: 1920,
  }, '<');`}
        </code>
      </pre>

      {/* 代码片段: Responsive */}
      <pre data-card="responsive">
        <code>
{`createScope({
  mediaQueries: {
    portrait: '(orientation: portrait)',
  }
})
.add(({ matches }) => {
  const isPortrait = matches.portrait;
  createTimeline().add('.circle', {
    y: isPortrait ? 0 : [-50, 50, -50],
    x: isPortrait ? [-50, 50, -50] : 0,
  }, stagger(100));
});`}
        </code>
      </pre>

      {/* 模块可视化卡片 */}
      <div
        className="modules-sizes home-section-card text-layout"
        data-card="modules"
        data-enter-offset="-=50lvh"
        data-leave-offset="-=150lvh"
      >
        <div className="box-heading">
          <h3>Bundle size</h3>
          <div className="modules-bundle-size">
            <span className="size">24.50</span> KB
          </div>
        </div>
        <div className="modules-sizes-chart chart">
          <div data-size="3.50" className="chart-bar module-waapi color-waapi"></div>
          <div data-size="0.55" className="chart-bar module-timeline color-timeline"></div>
          <div data-size="0.48" className="chart-bar module-stagger color-utils"></div>
          <div data-size="0.35" className="chart-bar module-svg color-svg"></div>
          <div data-size="0.52" className="chart-bar module-spring color-easings"></div>
          <div data-size="5.60" className="chart-bar module-timer color-timer"></div>
          <div data-size="4.30" className="chart-bar module-scroll color-events"></div>
          <div data-size="5.20" className="chart-bar module-animation color-animation"></div>
          <div data-size="6.41" className="chart-bar module-draggable color-draggable"></div>
          <div data-size="0.22" className="chart-bar module-scope color-scope"></div>
        </div>
        <ul className="modules-list">
          <li>
            <span className="label-dot color-timer"></span>
            Timer <span className="size">5.60 KB</span>
          </li>
          <li>
            <span className="label-dot color-animation"></span>
            Animation <span className="size">+5.20 KB</span>
          </li>
          <li>
            <span className="label-dot color-timeline"></span>
            Timeline <span className="size">+0.55 KB</span>
          </li>
          <li>
            <span className="label-dot color-animatable"></span>
            Animatable <span className="size">+0.40 KB</span>
          </li>
          <li>
            <span className="label-dot color-draggable"></span>
            Draggable <span className="size">+6.41 KB</span>
          </li>
          <li>
            <span className="label-dot color-events"></span>
            Scroll <span className="size">+4.30 KB</span>
          </li>
          <li>
            <span className="label-dot color-scope"></span>
            Scope <span className="size">+0.22 KB</span>
          </li>
          <li>
            <span className="label-dot color-svg"></span>
            SVG <span className="size">0.35 KB</span>
          </li>
          <li>
            <span className="label-dot color-utils"></span>
            Stagger <span className="size">+0.48 KB</span>
          </li>
          <li>
            <span className="label-dot color-easings"></span>
            Spring <span className="size">0.52 KB</span>
          </li>
          <li>
            <span className="label-dot color-waapi"></span>
            WAAPI <span className="size">3.50 KB</span>
          </li>
        </ul>
      </div>

      {/* 赞助级别卡片 */}
      <div
        className="funding-level-box home-section-card text-layout"
        data-card="sponsors"
        data-enter-offset="-=50lvh"
        data-leave-offset="-=50lvh"
      >
        <funding-level path="github-sponsors"></funding-level>
      </div>
    </div>
  )
}
