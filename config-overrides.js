const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const rewirePostcss = require("react-app-rewire-postcss");
const px2rem = require("postcss-px2rem");
const path = require("path");
function pathResolve(pathUrl) {
  return path.join(__dirname, pathUrl);
}
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@brand-primary": "#0094f5",
    },
  }),
  addWebpackAlias({
    "@": pathResolve("./src"),
    "@assets": pathResolve("./src/assets"),
    "@components": pathResolve("./src/components"),
    "@utils": pathResolve("./src/utils"),
    "@api":pathResolve("./src/api"),
    "@layouts": pathResolve("./src/layouts"),
    "@pages": pathResolve("./src/pages"),
    "@store": pathResolve("./src/store"),
    "@router": pathResolve("./src/router"),
  }),
  // 重写postcss
  (config, env) => {
    rewirePostcss(config, {
      plugins: () => [
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")({
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
        }),
        //关键:设置px2rem
        px2rem({
          remUnit: 37.5,
          exclude: /node-modules/,
        }),
      ],
    });
    return config;
  }
);
