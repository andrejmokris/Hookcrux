import CodeBlock from '@/components/code-block';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apiClient } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { Loader2, PlusCircle } from 'lucide-react';
import { FC, useState } from 'react';

type AddProjectMemberProps = {
  projectId: string;
};

export const AddProjectMember: FC<AddProjectMemberProps> = ({ projectId }) => {
  const [open, setOpen] = useState(false);

  const inviteUserMutation = useMutation({
    mutationKey: ['invite-user', projectId],
    mutationFn: async () => {
      const { data } = await apiClient.post<ProjectInvite>(`projects/${projectId}/invite`);
      return data;
    },
  });

  return (
    <>
      <Button className="gap-x-2" variant={'secondary'} onClick={() => setOpen(true)}>
        <PlusCircle className="w-4 h-4" />
        <span>New</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add new member</DialogTitle>
            <DialogDescription>Generate a invite link for your new project member.</DialogDescription>
          </DialogHeader>
          <Button disabled={inviteUserMutation.isPending} onClick={() => inviteUserMutation.mutateAsync()}>
            {inviteUserMutation.isPending ? <Loader2 className="animate-spin" /> : 'Generate invite link'}
          </Button>
          {inviteUserMutation.isSuccess && (
            <div className="overflow-hidden">
              <CodeBlock
                command={`${window.location.origin}/dashboard/invite?token=${inviteUserMutation.data.inviteToken}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
