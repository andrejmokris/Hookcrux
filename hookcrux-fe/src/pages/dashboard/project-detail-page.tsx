import { ProjectMembers } from '@/components/dashboard/projects/project-members';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ProjectDetailPage = () => {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['dashboard', 'projects', id],
    queryFn: async () => {
      const { data } = await apiClient.get<ProjectDetail>(`/projects/${id}`);
      return data;
    },
  });

  if (isLoading || !project) {
    return (
      <div className="flex flex-col gap-y-4 w-full">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-[220px] col-span-2" />
          <Skeleton className="w-full h-[220px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="w-full h-[220px]" />
          <Skeleton className="w-full h-[220px]" />
          <Skeleton className="w-full h-[220px]" />
        </div>
      </div>
    );
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {project.members.length} {project.members.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <ProjectMembers />
    </main>
  );
};
