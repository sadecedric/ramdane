import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mrhbanalyse.com'

  return [
    { url: base, lastModified: new Date() },
    // Ajoutez une ligne par page publique, par exemple :
    // { url: `${base}/pronostics`, lastModified: new Date() },
    // { url: `${base}/contact`, lastModified: new Date() },
  ]
}