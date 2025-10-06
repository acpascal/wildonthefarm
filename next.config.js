/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    allowedDevOrigins: ['192.168.1.84'],
    i18n: {
        locales: ['en', 'es', 'fr'],
        defaultLocale: 'en'
    }
};

module.exports = nextConfig;
