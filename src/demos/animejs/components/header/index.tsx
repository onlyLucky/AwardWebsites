// ===== Header 组件 =====
// 对应源码 #site-header
// 包含 Logo、版本选择器、导航菜单

// Logo 图片路径
const LOGO_URL = new URL('@/assets/animejs/images/anime-js-logo-v4.svg', import.meta.url).href

export default function Header() {
  return (
    <header id="site-header" className="layout-container text-ui ui-overlay">
      <div id="site-header-content">
        {/* Logo */}
        <h1 className="heading-logo header-logo">
          <a href="/">
            <img
              src={LOGO_URL}
              alt="anime.js logo v4"
              width="580"
              height="118"
            />
            <span>Anime.js | JavaScript Animation Engine</span>
          </a>
          {/* 版本选择器 */}
          <label id="docs-versions" className="ui-select ui-input docs-info-version">
            <select className="ui-input" name="docs-versions" aria-label="Anime.js versions">
              <option value="/documentation">4.0.0</option>
              <option value="/v3/documentation">3.2.2</option>
              <option value="/v2/documentation">2.1.0</option>
            </select>
          </label>
        </h1>

        {/* 导航菜单 */}
        <nav id="site-menu">
          <ul>
            <li>
              <a className="main-nav-link docs-link" data-id="docs" href="documentation.html" title="Documentation">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g id="sidebar" fill="none" fillRule="evenodd">
                    <path id="rectangle" fill="#FFFFFF" fillRule="nonzero" d="M16.167 6.125H7.833A3.375 3.375 0 0 0 4.458 9.5v5a3.375 3.375 0 0 0 3.375 3.375h8.334a3.375 3.375 0 0 0 3.375-3.375v-5a3.375 3.375 0 0 0-3.375-3.375zm-8.334 1.75h8.334c.897 0 1.625.728 1.625 1.625v5c0 .897-.728 1.625-1.625 1.625H7.833A1.625 1.625 0 0 1 6.208 14.5v-5c0-.897.728-1.625 1.625-1.625z"/>
                    <polyline id="Path-42" stroke="#FFFFFF" strokeWidth="1.75" points="9.5 7.75 9.5 12 9.5 16.25" data-points="13.5 8.75 10.5 12 13.5 15.25"/>
                  </g>
                </svg>
                <span>Docs</span>
              </a>
            </li>
            <li>
              <a className="main-nav-link" href="easing-editor.html" title="Easing functions editor">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon">
                  <path fill="none" stroke="currentColor" strokeWidth="1.75" d="M4.5,17 C14.5967876,17 8.37571813,7 19.5,7"/>
                </svg>
                <span>Easings</span>
              </a>
            </li>
            <li>
              <a className="main-nav-link" href="learn.html" title="Learn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon">
                  <g fill="none">
                    <path fill="currentColor" d="M16.1666667,6.125 L7.83333333,6.125 C5.9693723,6.125 4.45833333,7.63603897 4.45833333,9.5 L4.45833333,14.5 C4.45833333,16.363961 5.9693723,17.875 7.83333333,17.875 L16.1666667,17.875 C18.0306277,17.875 19.5416667,16.363961 19.5416667,14.5 L19.5416667,9.5 C19.5416667,7.63603897 18.0306277,6.125 16.1666667,6.125 Z M7.83333333,7.875 L16.1666667,7.875 C17.0641294,7.875 17.7916667,8.60253728 17.7916667,9.5 L17.7916667,14.5 C17.7916667,15.3974627 17.0641294,16.125 16.1666667,16.125 L7.83333333,16.125 C6.93587061,16.125 6.20833333,15.3974627 6.20833333,14.5 L6.20833333,9.5 C6.20833333,8.60253728 6.93587061,7.875 7.83333333,7.875 Z"/>
                    <path fill="currentColor" fillRule="evenodd" d="M10,10.0706309 L10,13.9294941 C10,14.2445758 10.2554242,14.5 10.5705059,14.5 C10.6590742,14.5 10.7464261,14.479379 10.8256439,14.4397701 L14.6845071,12.5103385 C14.9663248,12.3694297 15.0805539,12.0267421 14.9396451,11.7449245 C14.8844409,11.634516 14.7949156,11.5449908 14.6845071,11.4897865 L10.8256439,9.56035488 C10.5438263,9.41944606 10.2011387,9.53367523 10.0602299,9.81549288 C10.033824,9.86830478 10.0158571,9.92473182 10.0068132,9.9827243 L10,10.0706309 Z"/>
                  </g>
                </svg>
                <span>Learn</span>
              </a>
            </li>
            <li>
              <a
                className="main-nav-link nav-link-retractable"
                href="https://codepen.io/collection/Poerqa?cursor=eyJwYWdlIjoxfQ==/"
                target="_blank"
                title="CodePen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g id="codepen" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <path id="Shape" stroke="#FFFFFF" strokeWidth="1.75" d="M5 14.355L12 19l7-4.645v-4.71L12 5 5 9.645v4.71zm14 0l-7-4.71-7 4.71m0-4.71l7 4.646 7-4.646M12 5v4.645m0 4.71V19"/>
                  </g>
                </svg>
                <span>Examples</span>
              </a>
            </li>
            <li>
              <a
                className="main-nav-link nav-link-retractable"
                href="https://github.com/juliangarnier/anime"
                target="_blank"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g fill="none" fillRule="evenodd">
                    <path fill="currentColor" d="M12.007 4C7.579 4 4 7.606 4 12.066a8.06 8.06 0 0 0 5.475 7.652c.397.08.543-.173.543-.387 0-.187-.013-.828-.013-1.496-2.227.481-2.691-.961-2.691-.961-.358-.935-.888-1.175-.888-1.175-.73-.495.053-.495.053-.495.808.054 1.233.828 1.233.828.715 1.229 1.869.882 2.333.668.066-.52.278-.881.504-1.082-1.777-.187-3.646-.881-3.646-3.98 0-.88.318-1.602.822-2.163-.08-.2-.358-1.028.08-2.136 0 0 .676-.214 2.2.828a7.698 7.698 0 0 1 2.002-.268 7.7 7.7 0 0 1 2.001.268c1.525-1.042 2.2-.828 2.2-.828.438 1.108.16 1.936.08 2.136.517.561.822 1.282.822 2.164 0 3.098-1.869 3.779-3.659 3.98.292.253.544.734.544 1.495 0 1.082-.013 1.95-.013 2.217 0 .214.146.467.543.387A8.06 8.06 0 0 0 20 12.066C20.013 7.606 16.42 4 12.007 4z"/>
                  </g>
                </svg>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              {/* 源码使用 <sponsor-button> 自定义组件包裹 */}
              <sponsor-button>
                <a
                  className="main-nav-link sponsor-button"
                  href="https://github.com/sponsors/juliangarnier"
                  target="_blank"
                  title="Sponsor Julian Garnier on GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                    <g fill="none" fillRule="evenodd">
                      <path fill="currentColor" fillRule="nonzero" d="M12 18.445a.778.778 0 0 1-.34-.078C11.39 18.235 5 15.077 5 9.889a3.889 3.889 0 0 1 6.638-2.75L12 7.5l.362-.361A3.889 3.889 0 0 1 19 9.889c0 5.17-6.387 8.344-6.66 8.478a.778.778 0 0 1-.34.078z"/>
                    </g>
                  </svg>
                  <span>Sponsor</span>
                </a>
              </sponsor-button>
            </li>
          </ul>
        </nav>

        {/* 移动端菜单按钮 */}
        <button id="toggle-site-menu" className="ui-input trigger-pane" title="Toggle site menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
            <g id="menu" fill="none" fillRule="evenodd">
              <rect id="Rectangle" width="16" height="1.75" x="4" y="8" fill="currentColor"/>
              <rect id="Rectangle-Copy" width="16" height="1.75" x="4" y="14" fill="currentColor"/>
            </g>
          </svg>
        </button>
      </div>
    </header>
  )
}
