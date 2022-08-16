/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: () => {
    return [
      {
        source: '/random',
        destination: '/api/random',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
