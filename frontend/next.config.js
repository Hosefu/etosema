/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow images from external sources (S3)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'etosema.s3.regru.cloud',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.regru.cloud',
        pathname: '/etosema/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS images as fallback
      },
    ],
  },

  // SCSS support is built-in
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // API routes handle proxying now, no need for rewrites

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
}

module.exports = nextConfig
