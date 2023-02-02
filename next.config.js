const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: "diceoverdrive.com",
        defaultLocale: "en-US",
      },
      {
        domain: "br.diceoverdrive.com",
        defaultLocale: "pt-BR",
      },
    ],
  },
})
