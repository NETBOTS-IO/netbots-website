/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://netbots.io',
  generateRobotsTxt: false, // We will use app/robots.ts instead
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml', '/api/*'],
}
