/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;


// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   // reactStrictMode: true,
//   // images: {
//   //   domains: ['res.cloudinary.com'],
//   // },
// }
 
// export default nextConfig
