import { useState, useEffect } from 'react'
import styles from './style.module.css'

interface LoadingScreenProps {
  onComplete: () => void
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsReady(true), 300)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isReady) {
      // 淡出后调用完成回调
      const timer = setTimeout(() => {
        onComplete()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isReady, onComplete])

  return (
    <div className={`${styles.loadingScreen} ${isReady ? styles.fadeOut : ''}`}>
      {/* CRT 扫描线效果 */}
      <div className={styles.scanlines} />

      {/* 内容区域 */}
      <div className={styles.loadingContent}>
        {/* SHADER Logo */}
        <div className={styles.logoContainer}>
          <svg className={styles.logoIcon} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 模拟原站 logo 的条纹圆形 */}
            <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2" />
            <line x1="5" y1="20" x2="55" y2="20" stroke="white" strokeWidth="2" />
            <line x1="5" y1="28" x2="55" y2="28" stroke="white" strokeWidth="2" />
            <line x1="5" y1="36" x2="55" y2="36" stroke="white" strokeWidth="2" />
            <line x1="10" y1="44" x2="50" y2="44" stroke="white" strokeWidth="2" />
          </svg>
          <h1 className={styles.logoText}>SHADER</h1>
        </div>

        {/* 副标题 */}
        <p className={styles.subtitle}>Shader Development Studio, Website</p>
        <p className={styles.version}>Version 1.02</p>

        {/* 加载进度条 */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={styles.progressText}>{progress}%</p>
        </div>
      </div>

      {/* 版权信息 */}
      <footer className={styles.loadingFooter}>
        <p>Copyright (c) Shader Development Studio AB, 2026. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default LoadingScreen
