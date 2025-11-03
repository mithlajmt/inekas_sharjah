/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Only for demo - remove in production
  },
  eslint: {
    ignoreDuringBuilds: true, // Only for demo - remove in production
  },
}

module.exports = nextConfig