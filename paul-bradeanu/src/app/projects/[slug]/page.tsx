import { notFound } from "next/navigation";
import {
  getProject,
  getRelatedProjects,
  projectCoverSrc,
  projects,
} from "@/data/projects";
import { CaseStudyView } from "@/components/projects/CaseStudyView";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: projectCoverSrc(project),
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);

  return <CaseStudyView project={project} related={related} />;
}
