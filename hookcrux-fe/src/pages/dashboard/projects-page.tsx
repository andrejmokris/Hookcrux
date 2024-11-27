import { ProjectList } from '@/components/dashboard/projects/project-list';

export const ProjectsPage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <ProjectList />
    </div>
  );
};
