// ===== Footer 组件 =====
// 对应源码 #site-footer
// 包含赞助商、站点链接、社交链接、版权信息、邮件订阅

import SponsorButton from '../web-components/sponsor-button'

// Logo 图片路径
const LOGO_URL = new URL('@/assets/animejs/images/anime-js-logo-v4.svg', import.meta.url).href
// 赞助商占位图路径
const SPONSOR_PLACEHOLDER_URL = new URL('@/assets/animejs/media/pages/sponsors/platinum-sponsors/973aa34310-1769187540/sponsor-placeholder.svg', import.meta.url).href

// 通用箭头图标
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
      <g fill="none" fillRule="evenodd">
        <polygon fill="currentColor" fillRule="nonzero" points="17.737 11.987 12.5 17.225 11.263 15.987 14.388 12.862 6.5 12.862 6.5 11.112 14.388 11.112 11.263 7.987 12.5 6.75" />
      </g>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="site-footer" className="layout-container" data-color="fg">
      <div id="site-footer-content">
        <div className="footer-row">
          {/* 赞助商区块 */}
          <div className="footer-block footer-block-sponsors">
            <strong className="links-list-heading">Platinum sponsors</strong>
            <ul className="links-list">
              <li>
                <a
                  className="sponsor"
                  href="https://github.com/sponsors/juliangarnier"
                  target="_blank"
                  title="Become a sponsor"
                  data-url-params=""
                  data-url-params-docs=""
                >
                  <img
                    src={SPONSOR_PLACEHOLDER_URL}
                    alt="Become a sponsor"
                    width="100"
                    height="100"
                    loading="lazy"
                  />
                  <span>Become a sponsor</span>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <SponsorButton>
                  <a href="https://github.com/sponsors/juliangarnier" target="_blank">
                    Become a sponsor
                    <ArrowIcon />
                  </a>
                </SponsorButton>
              </li>
            </ul>
          </div>

          {/* 链接区块 */}
          <div className="footer-block footer-block-links">
            <div className="footer-block">
              <strong className="links-list-heading">Site</strong>
              <ul className="links-list">
                <li>
                  <a href="index.html" title="Documentation">
                    Home
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a href="documentation.html" title="Documentation">
                    Documentation
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a href="easing-editor.html" title="Easing functions editor">
                    Easings editor
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a href="learn.html" title="Learn">
                    Learn
                    <ArrowIcon />
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-block">
              <strong className="links-list-heading">Socials</strong>
              <ul className="links-list">
                <li>
                  <a target="_blank" href="https://x.com/juliangarnier">
                    X / Twitter
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://bsky.app/profile/animejs.com">
                    Bluesky
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com/juliangarnier/anime">
                    GitHub
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://codepen.io/collection/Poerqa">
                    CodePen
                    <ArrowIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部行 */}
        <div className="footer-row">
          <div className="footer-block footer-logo-block">
            <div className="heading-logo footer-logo">
              <a href="/">
                <img
                  src={LOGO_URL}
                  alt="anime.js logo v4"
                  width="580"
                  height="118"
                />
                <span>Anime.js | JavaScript Animation Engine</span>
              </a>
            </div>
            <div className="footer-copyright">
              &copy; 2026 <a href="https://juliangarnier.com" target="_blank">Julian Garnier</a>
            </div>
          </div>

          {/* 邮件订阅区块 */}
          <div className="footer-block">
            <strong className="links-list-heading">Stay in the loop</strong>
            <div className="email-signup-form">
              <form>
                <div className="email-signup-fields is-active">
                  <input className="email-signup-field email-signup-input" type="email" name="email" placeholder="Enter your email" required />
                  <input className="email-signup-field email-signup-submit" type="submit" value="Subscribe" />
                </div>
                <div className="email-signup-alert email-signup-success">
                  <p>Thanks! Check your inbox to confirm your subscription.</p>
                </div>
                <div className="email-signup-alert email-signup-error">
                  <p>Something went wrong. Please try again later or email me directly at <a href="mailto:julian@animejs.com">julian@animejs.com</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
