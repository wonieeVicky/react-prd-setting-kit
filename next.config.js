/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  // scrollRestoration: true,
  swcMinify: true, // babel 대신 swc를 사용할 것이므로 옵션활성화
  compiler: {
    styledComponents: true, // displayname : true, ssr: true
  },

  webpack: (config) => {
    return {
      ...config,
      // infrastructureLogging: { debug: /PackFileCache/ },
      devtool: process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'eval-source-map',
      // resolve: {
      //   alias: {
      //     '@': path.resolve(__dirname, 'src'),
      //     // '@store': path.resolve(__dirname, 'src'),
      //   },
      // },
    };
  },

  // experimental: {
  //   esmExternals: true,
  //   // lodash 모듈도 사용하고자 하는 개별 함수들만 임포트해서 Tree Shaking 할 수 있게 적용하였다.
  //   modularizeImports: {
  //     lodash: { transform: 'lodash/{{member}}' },
  //   },
  // },
  // resolve: {
  //   alias: {
  //     // '@pages': path.resolve(__dirname, 'src/pages'),
  //     // '@components': path.resolve(__dirname, 'src/components'),
  //     // '@layouts': path.resolve(__dirname, 'src/layouts'),
  //     '@store': path.resolve(__dirname, 'store'),
  //   },
  // },

  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/public',
  //       destination: '/public/servicecheck.html',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
