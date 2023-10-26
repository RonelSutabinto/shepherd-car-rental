/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.imagin.studio"]
    },

    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    output: 'export'
    
}

module.exports = nextConfig
