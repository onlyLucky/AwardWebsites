'use client'

import { useEffect, useState, type ComponentType } from 'react'
import DemoLoading from '@/components/demo-loading'

interface DemoWrapperProps {
  Component: ComponentType
  name: string
}

export default function DemoWrapper({ Component, name }: DemoWrapperProps) {
  const [showDemo, setShowDemo] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(false)
  const [componentReady, setComponentReady] = useState(false)

  useEffect(() => {
    // 最少显示 2 秒加载动画
    const timer = setTimeout(() => {
      setMinTimePassed(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // 组件已加载
  useEffect(() => {
    setComponentReady(true)
  }, [])

  // 当两者都满足时显示 demo
  useEffect(() => {
    if (minTimePassed && componentReady) {
      setShowDemo(true)
    }
  }, [minTimePassed, componentReady])

  if (!showDemo) {
    return <DemoLoading name={name} />
  }

  return <Component />
}
