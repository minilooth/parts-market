/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://jsonplaceholder.typicode.com/:path*' // Proxy to Backend
  //     }
  //   ]
  // }
}

module.exports = nextConfig
