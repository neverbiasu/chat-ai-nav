/* eslint-env node */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.oaistatic.com',
      'cdn.midjourney.com',
      'claude.ai',
      'github.githubassets.com',
      'www.jasper.ai',
      'lh3.googleusercontent.com',
      'perplexity.ai',
      'framerusercontent.com',
      'github.blog',
      'www.gstatic.com',
      'is1-ssl.mzstatic.com',
      'logos-world.net',
      'cdn-icons-png.flaticon.com'
    ]
  }
}

module.exports = nextConfig
