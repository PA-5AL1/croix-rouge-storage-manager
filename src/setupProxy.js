const { createProxyMiddleware } = require("http-proxy-middleware");

const matchUrl = "/api";
const target = "";
const prevUrl = "^/api";
const writeUlr = "/api/react-ant-admin";

module.exports = function (app) {
  app.use(
    createProxyMiddleware(matchUrl, {
      target,
      changeOrigin: true,
      secure: true,// https
      pathRewrite: { [prevUrl]: writeUlr },
    })
  );
};
