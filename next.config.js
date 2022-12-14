/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "127.0.0.1",
      "marketplace.somhako.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "somhako-marketplace.s3.amazonaws.com",
    ],
  },
  ignoreBuildErrors: true,
};

module.exports = nextConfig;
