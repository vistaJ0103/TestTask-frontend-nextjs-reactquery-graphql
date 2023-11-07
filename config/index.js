const config = {
  test: {
    API_URL: "api",
    ENGINE_WS_URL: "ws://localhost:4201",
  },
  development: {
    API_URL: "http://localhost:4200/api",
    ENGINE_WS_URL: "ws://localhost:4201",
  },
  production: {
    API_URL: "api",
    ENGINE_WS_URL: "ws://50.17.30.177:4201",
  },
};
export default config[process.env.NODE_ENV];
