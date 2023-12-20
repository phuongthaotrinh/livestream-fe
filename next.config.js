/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "tentulogo.com", 'wpdemo.vegatheme.com', "merakiui.com"],
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
