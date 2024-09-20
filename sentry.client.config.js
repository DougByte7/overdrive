// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    dsn:
        SENTRY_DSN ||
        'https://9d1126cff3f64b76b5e9492be373d6cb@o4504726191276032.ingest.sentry.io/4504726194159616',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    debug: false,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
        Sentry.feedbackIntegration({
            // Additional SDK configuration goes in here, for example:
            colorScheme: 'dark',
            showBranding: false,
            themeDark: {
                background: 'var(--mantine-color-body)',
            },
        }),
    ],

    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
})
