import { projectsData, ProjectID } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/chapters/ProjectCaseStudy";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData[id as ProjectID];
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Venkata Naga Sai`,
    description: project.overview.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData[id as ProjectID];

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
