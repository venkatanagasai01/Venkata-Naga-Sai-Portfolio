import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://venkatanagasai01.github.io'; // Replace with actual production URL if different

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = Object.values(projectsData).map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
