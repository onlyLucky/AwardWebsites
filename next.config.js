import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React Strict Mode
  reactStrictMode: true,

  // Turbopack 根目录配置
  turbopack: {
    root: __dirname,
  },

  // 转译 Three.js 相关包
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],

  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['three', '@react-three/fiber', 'lucide-react'],
  },

  // 图片配置
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },

  // 输出配置
  output: 'standalone',

  // 压缩配置
  compress: true,

  // 生产环境优化
  poweredByHeader: false,
  generateEtags: false,
}

export default nextConfig
