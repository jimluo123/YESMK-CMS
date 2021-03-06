const path = require("path");
const {
  override,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
  setWebpackPublicPath,
  watchAll,
  adjustStyleLoaders,
} = require("customize-cra");
// const PUBLIC_PATH = process.env.REACT_APP_ENV === "production" ? "/" : "/";
// const devServerConfig = () => (config) => {
//   return {
//     ...config,
//     open: false,
//     port: 3000,
//     proxy: {
//       //   "/api": {
//       //     target: "http://localhost:9090/",
//       //     // target: "http://119.29.134.117:9090/",
//       //     pathRewrite: {
//       //       "^/api": "",
//       //     },
//       //     changeOrigin: true,
//       //     secure: false,
//       //   },
//     },
//   };
// };

module.exports = {
  webpack: override(
    // publicPath
    // setWebpackPublicPath(PUBLIC_PATH),
    // less
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        localIdentName: "[local]--[hash:base64:5]",
      },
    }),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
      const postcssOptions = postcss.options;
      postcss.options = { postcssOptions };
    })
    // 别名
    // addWebpackAlias({
    //   "@": path.resolve(__dirname, "src"),
    //   _c: path.resolve(__dirname, "src/components"),
    // })
  ),

  // devServer: overrideDevServer(watchAll),
};
