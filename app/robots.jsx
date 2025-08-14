export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      sitemap: 'https://jose-juarez-portfolio.vercel.app/sitemap.xml',
    }
  }