// ===== Get Started Section 组件 =====
// 对应源码 #get-started (开始使用)
// 包含标题、描述、文档链接列表

// SVG 箭头图标组件
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
      <g fill="none" fillRule="evenodd">
        <polygon fill="currentColor" fillRule="nonzero" points="17.737 11.987 12.5 17.225 11.263 15.987 14.388 12.862 6.5 12.862 6.5 11.112 14.388 11.112 11.263 7.987 12.5 6.75"/>
      </g>
    </svg>
  )
}

export default function GetStartedSection() {
  return (
    <section id="get-started" data-chapter="get-started" data-label="GET_STARTED">
      {/* 章节间距 */}
      <div className="section-spacer"></div>

      <section className="home-section text-layout">
        <div className="home-section-content home-section-centered">
          <div className="home-section-text home-section-centered">
            <h2 className="text-xxxl">Start animating</h2>
            <p>Get started quickly with our in-depth documentation.</p>
          </div>
          <ul className="links-list links-list-grid">
            <li>
              <a href="documentation/getting-started.html">
                <span className="label-dot"></span>
                Getting started
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/timer.html">
                <span className="label-dot"></span>
                Timer
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/animation.html">
                <span className="label-dot"></span>
                Animation
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/timeline.html">
                <span className="label-dot"></span>
                Timeline
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/animatable.html">
                <span className="label-dot"></span>
                Animatable
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/draggable.html">
                <span className="label-dot"></span>
                Draggable
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/scope.html">
                <span className="label-dot"></span>
                Scope
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/events/onscroll.html">
                <span className="label-dot"></span>
                Scroll
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/svg.html">
                <span className="label-dot"></span>
                SVG
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/utilities.html">
                <span className="label-dot"></span>
                Utils
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/easings.html">
                <span className="label-dot"></span>
                Easings
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href="documentation/web-animation-api.html">
                <span className="label-dot"></span>
                WAAPI
                <ArrowIcon />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </section>
  )
}
