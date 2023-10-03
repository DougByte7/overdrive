// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withSentryConfig(
  withPWA({
    experimental: { appDir: true },
    i18n: {
      locales: ["en-US", "pt-BR"],
      defaultLocale: "pt-BR",
    },
    reactStrictMode: true,
  }),
  { silent: true },
  { hideSourcemaps: true },
);
