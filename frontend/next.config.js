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
    formats: ['image/avif', 'image/webp'], // Modern formats with better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Standard responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Smaller images
    minimumCacheTTL: 60, // Cache for 60 seconds
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
};

module.exports = nextConfig;
