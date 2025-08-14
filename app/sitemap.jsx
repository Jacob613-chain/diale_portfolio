export default function sitemap() {
    return [
      {
        url: 'https://jose-juarez-portfolio.vercel.app/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://jose-juarez-portfolio.vercel.app/about',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://jose-juarez-portfolio.vercel.app/works',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://jose-juarez-portfolio.vercel.app/contact',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]
  }