'use client'

import { useEffect, useState } from 'react'

interface DemoLoadingProps {
  name: string
}

export default function DemoLoading({ name }: DemoLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // 延迟显示避免闪烁
    const showTimer = setTimeout(() => setShow(true), 100)

    // 模拟加载进度 - 确保至少 2 秒
    const startTime = Date.now()
    const minDuration = 2000 // 最少 2 秒

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const timeProgress = Math.min((elapsed / minDuration) * 100, 100)

      setProgress((prev) => {
        // 使用时间进度和随机增量的组合
        const targetProgress = Math.min(timeProgress, 95)
        const increment = Math.random() * 8

        if (prev >= targetProgress) {
          return prev
        }

        return Math.min(prev + increment, targetProgress)
      })

      // 达到 100% 后清除定时器
      if (timeProgress >= 100) {
        clearInterval(interval)
        setProgress(100)
      }
    }, 100)

    return () => {
      clearTimeout(showTimer)
      clearInterval(interval)
    }
  }, [])

  if (!show) return null

  return (
    <div className='bg-background fixed inset-0 z-50 flex flex-col items-center justify-center'>
      {/* 加载动画 */}
      <div className='flex flex-col items-center gap-6'>
        {/* 旋转动画 */}
        <div className='relative h-16 w-16'>
          <div className='border-muted absolute inset-0 rounded-full border-2' />
          <div className='border-primary absolute inset-0 animate-spin rounded-full border-2 border-t-transparent' />
        </div>

        {/* Demo 名称 */}
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-foreground text-lg font-semibold tracking-tight'>{name}</h2>
          <p className='text-muted-foreground text-sm'>Loading demo...</p>
        </div>

        {/* 进度条 */}
        <div className='bg-muted h-1 w-48 overflow-hidden rounded-full'>
          <div
            className='bg-primary h-full rounded-full transition-all duration-300 ease-out'
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
