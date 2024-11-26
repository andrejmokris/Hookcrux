import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export const CreateNewProject = () => {
  const queryClient = useQueryClient();

  const [isHovered, setIsHovered] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const createProjectMutation = useMutation({
    mutationKey: ['create-project'],
    mutationFn: async (createProjectData: z.infer<typeof createProjectSchema>) => {
      const { data } = await apiClient.post<Project>('/projects', createProjectData);
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: 'Successfully created project!',
        description: `Project ${data.name} created successfully.`,
      });
      queryClient.invalidateQueries({
        queryKey: ['dashboard', 'projects'],
      });
      setOpenDialog(false);
    },
    onError: () => {
      form.setError('name', {
        message: 'Error occured while creating your project.',
      });
    },
  });

  function onSubmit(values: z.infer<typeof createProjectSchema>) {
    createProjectMutation.mutate(values);
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          className=" font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => setOpenDialog(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Create New Project"
        >
          <span className="mr-2">Create New Project</span>
          <motion.div animate={{ rotate: isHovered ? 90 : 0 }} transition={{ duration: 0.3 }}>
            <Plus className="h-5 w-5" />
          </motion.div>
        </Button>
      </motion.div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>Create a new project to start tracking your hooks.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input placeholder="Another of my ambitious projects" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Another of my ambitious projects" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={createProjectMutation.isPending} className="min-w-[140px]">
                {createProjectMutation.isPending ? <Loader2 className="animate-spin" /> : 'Create a project'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
