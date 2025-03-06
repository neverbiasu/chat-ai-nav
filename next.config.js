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
      'is1-ssl.mzstatic.com', // 添加了缺失的图像域名
      'framerusercontent.com', // 添加 Perplexity 图标的域名
      'github.blog', // 添加 GitHub Blog 域名
      'www.gstatic.com', // 添加 Google 图标的域名
      'is1-ssl.mzstatic.com',
      'logos-world.net'
    ]
  }
}

module.exports = nextConfig
