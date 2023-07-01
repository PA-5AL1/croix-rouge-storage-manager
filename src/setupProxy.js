const { createProxyMiddleware } = require("http-proxy-middleware");

const matchUrl = "/api"; // 请求是匹配的地址
const target = "https://azhengpersonalblog.top/"; // 目标网址
const prevUrl = "^/api"; // 以/api路径截取
const writeUlr = "/api/react-ant-admin"; // 重写请求路径

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
