/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  skipTrailingSlashRedirect: true,
  productionBrowserSourceMaps: true,
  images: {
    // remotePatterns: [
    //   {
    //     hostname: "**",
    //     // protocol: "http",
    //     protocol: "**",
    //     port: "**",
    //     pathname: "/**",
    //   },
    // ],
    domains: ["*"],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  async redirects() {
    const KTX_STUDENT_ACCESS_TOKEN = "ktx_student_access_token";

    // Định nghĩa các route cần bảo vệ
    const protectedRoutes = [
      "/",
      // "/quan-ly-sinh-vien",
      // "/quan-ly-don-dang-ky",
      // "/quan-ly-phong",
      // "/quan-ly-hoa-don",
      // "/quan-ly-ky-tuc-xa",
      // "/quan-ly-toa-nha",
      // "/tra-cuu-hoa-don",
    ];

    // Tạo redirect rules cho login page
    const loginRedirect = {
      source: "/dang-nhap",
      has: [{ type: "cookie", key: KTX_STUDENT_ACCESS_TOKEN }],
      permanent: false,
      destination: "/",
    };

    // Tạo redirect rules cho các protected routes
    const protectedRedirects = protectedRoutes.map((route) => ({
      source: route,
      missing: [{ type: "cookie", key: KTX_STUDENT_ACCESS_TOKEN }],
      destination: "/dang-nhap",
      permanent: true,
    }));

    return [loginRedirect, ...protectedRedirects];
  },
};

export default nextConfig;
