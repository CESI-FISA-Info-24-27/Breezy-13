import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ajoutez ce bloc pour le proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home-page',
        permanent: false,
      },
    ];
  }
};

export default withFlowbiteReact(nextConfig);