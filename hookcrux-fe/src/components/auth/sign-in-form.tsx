import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(80),
});

export const SignInForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInMutation = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async (signInData: z.infer<typeof signInFormSchema>) => {
      const { data } = await apiClient.post<accessToken>('/auth/sign-in', signInData);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      queryClient.invalidateQueries({
        queryKey: ['auth'],
      });
      toast({
        title: 'Successfully signed in!',
        description: `Welcome back!`,
      });
      navigate(searchParams.get('redirect') ?? '/dashboard');
    },
    onError: () => {
      form.setError('password', {
        message: 'Invalid email or password',
      });
    },
  });

  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    signInMutation.mutate(values);
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
        <Button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={signInMutation.isPending}
        >
          {signInMutation.isPending ? <Loader2Icon className="animate-spin" /> : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
};
