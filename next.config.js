/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "tentulogo.com", 'wpdemo.vegatheme.com', "merakiui.com"],
    },
    reactStrictMode: false,
    swcMinify: true,
}

module.exports = nextConfig
