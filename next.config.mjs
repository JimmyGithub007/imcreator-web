/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**', // Allow all paths from this domain
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
