import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { MoreVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ProjectInvitesList = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['dashboard', 'projects', 'invites'],
    queryFn: async () => {
      const { data } = await apiClient.get<ProjectInviteDetail[]>(`/projects/${id}/invites`);
      return data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-muted-foreground">
          Pending invites
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Project invites</DialogTitle>
          <DialogDescription>See all project invites and possibly revoke them.</DialogDescription>
        </DialogHeader>
        <Table>
          <TableCaption>A list of project invites.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invite ID</TableHead>
              <TableHead>Expires at</TableHead>
              <TableHead>Assigned Role</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Created by</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell className="font-medium">
                  {invite.id.slice(0, 3)}...{invite.id.slice(-3)}
                </TableCell>
                <TableCell>{format(new Date(invite.expiresAt), 'dd.MM.yyyy')}</TableCell>
                <TableCell>{invite.projectRole}</TableCell>
                <TableCell>{format(new Date(invite.createdAt), 'dd.MM.yyyy')}</TableCell>
                <TableCell>{invite.createdBy.name ?? invite.createdBy.email}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <Button variant={'ghost'}>
                    <MoreVertical className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};
