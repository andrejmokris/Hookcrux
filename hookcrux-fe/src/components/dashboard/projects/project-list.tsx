import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { CreateNewProject } from './create-new-project';
import { ProjectCard } from './project-card';

export const ProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'projects'],
    queryFn: async () => {
      const { data } = await apiClient.get<Project[]>('/projects');
      return data;
    },
  });

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Projects</h2>
        <CreateNewProject />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {isLoading && (
          <>
            <Skeleton className="w-full h-[220px]" />
            <Skeleton className="w-full h-[220px]" />
          </>
        )}
        {data && data.length > 0 && data?.map((project) => <ProjectCard key={project.id} project={project} />)}
        {data && data.length === 0 && <p>No projects found, but you can create one!</p>}
      </div>
    </div>
  );
};
