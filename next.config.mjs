/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "assets.suitdev.com",
            pathname: "/storage/files/**",
        }]
    }
};

export default nextConfig;
