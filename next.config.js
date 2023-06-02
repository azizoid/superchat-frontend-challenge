/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: {
    buildActivity: false,
  },
  swcMinify: true,
  compress: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}
