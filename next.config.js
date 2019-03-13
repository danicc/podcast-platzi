// next.config.js
const withOffline = require("next-offline");

const nextConfig = {
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api.audioboom.com\/.*/,
        handler: "staleWhileRevalidate",
        options: {
          cacheName: "audioboom-cache",
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
        handler: "cacheFirst",
        options: {
          cacheName: "image-cache",
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "https-calls",
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = withOffline(nextConfig);
