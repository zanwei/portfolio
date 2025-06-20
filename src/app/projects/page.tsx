import Image from "next/image";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";
import { projectsData } from "@/lib/project-data";

export default function ProjectsPage() {
  return (
    <>
      <PageBackground color="#ffffff" />
      
      <main className="max-w-3xl mx-auto py-12 px-4 relative z-10">
        <h1 className="text-3xl font-bold mb-8">All Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block rounded-lg overflow-hidden transition hover:shadow-lg"
            >
              <div className="relative w-full h-40">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
} 