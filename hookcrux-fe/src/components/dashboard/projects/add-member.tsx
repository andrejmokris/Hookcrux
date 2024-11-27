import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { FC, useState } from 'react';

type AddProjectMemberProps = {
  projectId: string;
};

export const AddProjectMember: FC<AddProjectMemberProps> = ({ projectId }) => {
  const [open, setOpen] = useState(false);

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
        </DialogContent>
      </Dialog>
    </>
  );
};
