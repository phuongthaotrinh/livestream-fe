/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "tentulogo.com"],
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
