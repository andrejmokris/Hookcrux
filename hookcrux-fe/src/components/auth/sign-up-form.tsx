import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(80),
});

export const SignUpForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const createAccountMutation = useMutation({
    mutationKey: ['create-account'],
    mutationFn: async (signUpData: z.infer<typeof formSchema>) => {
      const { data } = await apiClient.post<User>('/auth/sign-up', signUpData);
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: 'Successfully signed up!',
        description: `Helllo, ${data.email}, you can now log in with your new account.`,
      });
      navigate('/sign-in');
    },
    onError: () => {
      form.setError('password', {
        message: 'Error occured while creating your account.',
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAccountMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormDescription>Email will be used for login and notifications.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
          {createAccountMutation.isPending ? <Loader2Icon className="animate-spin" /> : 'Sign up with Email'}
        </Button>
      </form>
    </Form>
  );
};
