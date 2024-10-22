/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://signalvase.com', // Replace with your domain
    generateRobotsTxt: true, // (optional) Generates a `robots.txt` file
    // Additional options can be set here, such as exclusions
  };
  