import { ProjectList } from '@/components/dashboard/projects/project-list';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <ProjectList />
    </div>
  );
};
