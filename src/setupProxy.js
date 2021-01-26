const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/controls",
    createProxyMiddleware({
      target: "http://controls-mta-pathfinder.apps.ocp4.prod.psi.redhat.com",
      // target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/api/controls": "/controls",
      },
    })
  );
};
