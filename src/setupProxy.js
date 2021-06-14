const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://elm.cangdu.org/",
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};