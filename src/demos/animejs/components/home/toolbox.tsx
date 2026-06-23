// ===== Toolbox Section 组件 =====
// 对应源码 #toolbox (工具箱介绍)
// 包含标题、描述、工具箱标签

export default function ToolboxSection() {
  return (
    <section
      id="toolbox"
      className="home-section-container home-section-light"
      data-chapter="toolbox"
      data-label="TOOLBOX"
      data-enter-offset="-=100lvh"
      data-leave-offset="-=10lvh"
    >
      <div className="home-section fixed-section">
        <div className="home-section-content">
          <div className="home-section-text text-layout home-section-text-short">
            <h2 className="section-heading text-xxl">
              The complete{' '}
              <br />
              animator's toolbox
            </h2>
            <p className="section-sub-heading">
              Break free from browser limitations and animate anything on the
              web with a single API.
            </p>
          </div>
          <div className="toolbox-labels-container layout-container">
            <div className="toolbox-labels">
              <ul className="toolbox-labels-left"></ul>
              <ul className="toolbox-labels-right"></ul>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
    </section>
  )
}
