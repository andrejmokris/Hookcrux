import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const InvitePage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { data, isLoading } = useQuery({
    queryKey: ['invite', token],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<ProjectInviteDetail>(`/projects/invite?token=${token}`);
        return data;
      } catch {
        toast({
          title: 'Failed to accept invite!',
          description: 'Please try again later or contact support.',
          variant: 'destructive',
        });
        navigate('/dashboard');
        return null;
      }
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading || !data ? (
        <Skeleton className="w-full max-w-lg h-[300px]" />
      ) : (
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Project Invitation
            </CardTitle>
            <CardDescription>You&apos;ve been invited to join a collaborative project</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-2">{data.project.name}</p>
            <p className="text-sm text-muted-foreground">Invited by: {data.createdBy.name ?? data.createdBy.email}</p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Decline</Button>
            <Button>Accept</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
