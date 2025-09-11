export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      sitemap: 'https://obsydia-ai.vercel.app/sitemap.xml',
    }
  }