/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lumierestudio.es',
  generateRobotsTxt: true,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  exclude: ['/api/*'],
}
