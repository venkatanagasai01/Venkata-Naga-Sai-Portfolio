import { notFound } from "next/navigation";
import { projectsData, ProjectID } from "@/data/projects";
import ProjectCaseStudy from "@/components/chapters/ProjectCaseStudy";

// Generate static params for SSG
export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projectsData[params.slug as ProjectID];

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
