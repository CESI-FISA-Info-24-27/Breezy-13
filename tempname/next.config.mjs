import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ajoutez ce bloc pour le proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Toutes les requêtes commençant par /api/
        destination: 'http://localhost:3000/:path*', // Adresse de l'API (adapter si besoin)
      },
    ];
  },
};

export default withFlowbiteReact(nextConfig);