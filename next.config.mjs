/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        // pathname: '/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        // pathname: '/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
      },
    ],
  },

  
};

export default nextConfig;
