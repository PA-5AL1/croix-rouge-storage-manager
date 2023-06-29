
const devConfig = {
  PORT: 3000,
  HOST: "0.0.0.0",
  NODE_ENV: "development",
  REACT_APP_ROUTERBASE: "/react-ant-admin",
  REACT_APP_API_BASEURL: "http://127.0.0.1:8081/api/react-ant-admin",
  PUBLIC_URL: "/react-ant-admin",
}
const productionCfg = {
  REACT_APP_ROUTERBASE: "/react-ant-admin",
  REACT_APP_API_BASEURL: "/api/react-ant-admin",
  PUBLIC_URL: "/react-ant-admin",
  NODE_ENV: "production", //
  BUILD_PATH: "react-ant-admin", //
}
module.exports = Promise.resolve({

  development: devConfig,

  development_color: {
    ...devConfig,
    COLOR: "true",
  },

  development_mock: {
    ...devConfig,
    REACT_APP_MOCK: "1",
  },

  development_color_mock: {
    ...devConfig,
    COLOR: "true",
    REACT_APP_MOCK: "1",
  },

  production: productionCfg,

  production_color: {
    ...productionCfg,
    COLOR: "true",
  },

  production_color_mock: {
    ...productionCfg,
    COLOR: "true",
    REACT_APP_MOCK: "1",
  },

  production_github: {
    ...productionCfg,
    COLOR: "true",
    REACT_APP_API_BASEURL: "",
    REACT_APP_ROUTER_ISHASH: "1",
    REACT_APP_ROUTERBASE: "/"
  }
})
