/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['stream.mux.com', 'analytics.shader.build'],
  },
  experimental: {
    appDocumentPreloading: undefined,
  },
}