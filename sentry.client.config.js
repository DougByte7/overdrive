// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    dsn:
        SENTRY_DSN ||
        'https://9d1126cff3f64b76b5e9492be373d6cb@o4504726191276032.ingest.sentry.io/4504726194159616',
    tracesSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
        Sentry.feedbackIntegration({
            colorScheme: 'dark',
            showBranding: false,
            themeDark: {
                background: 'var(--mantine-color-body)',
            },
            buttonLabel: 'Reportar um Bug',
            formTitle: 'Reportar um Bug',
            cancelButtonLabel: 'Cancelar',
            formTitle: 'Enviar',
            nameLabel: 'Nome',
            namePlaceholder: 'Seu Nome',
            emailPlaceholder: 'seu.email@examplo.com',
            messageLabel: 'Descrição',
            messagePlaceholder: 'Qual o bug? O que você esperava?',
            successMessageText: 'Obrigado pelo seu relato!',
            isRequiredText: '(obrigatório)',
            addScreenshotButtonLabel: 'Adicionar captura de tela',
            removeScreenshotButtonLabel: 'Remover captura de tela',
            confirmButtonLabel: 'Confirmar',
        }),
    ],
})
