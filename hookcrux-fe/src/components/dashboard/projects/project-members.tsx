import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { MoreVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { AddProjectMember } from './add-member';

function UserLoading() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
    </div>
  );
}

export const ProjectMembers = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'projects', 'members'],
    queryFn: async () => {
      const { data } = await apiClient.get<ProjectMemberDetail[]>(`/projects/${id}/members`);
      return data;
    },
  });

  return (
    <Card className="flex flex-col h-full max-h-[calc(100dvh-64px)]">
      <CardHeader className="bg-muted/50 ">
        <CardTitle className="w-full items-center flex justify-between">
          Members
          <AddProjectMember projectId={id as string} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto  py-4">
        {isLoading || !data ? (
          [1, 2, 3, 4, 5].map((i) => <UserLoading key={`userLoading${i}`} />)
        ) : data.length > 0 ? (
          data.map((member) => (
            <div className="flex items-center justify-between mb-8 last:mb-0" key={`pilotUser${member.id}`}>
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={member.user?.avatar_url ?? undefined}
                    alt={member.user?.name ?? member.user?.email ?? ''}
                  />
                  <AvatarFallback className="rounded-lg">
                    {member.user?.name?.split(' ')[0] ?? member.user?.email?.split('@')[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{member.user.name}</p>
                  <p className="text-sm text-muted-foreground">{member.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <Badge variant="outline">{member.role}</Badge>
                <MoreVertical className="size-5" />
              </div>
            </div>
          ))
        ) : (
          <p>No members found</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 border-t-[0.4px]">
        <p className="text-sm text-muted-foreground">
          {data?.length} {data?.length === 1 ? 'member' : 'members'}
        </p>
        <p className="text-sm text-muted-foreground">View all</p>
      </CardFooter>
    </Card>
  );
};
