import useAuth from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const GithubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('code');

  const auth = useAuth();

  const { isLoading, isError } = useQuery({
    queryKey: ['auth-github-callback', token],
    queryFn: async () => {
      try {
        if (!token) {
          throw new Error('Token not found');
        }
        const data = await auth.githubLogin(token);
        toast({
          title: 'Successfully logged in via GitHub!',
          description: 'You can use the platform.',
        });
        navigate('/dashboard');
        return data;
      } catch {
        toast({
          title: 'Failed to login via GitHub!',
          description: 'Please try again later or contact support.',
          variant: 'destructive',
        });
        navigate('/log-in');
        return null;
      }
    },
  });

  if (isLoading) {
    return <div>Logging in via GitHub...</div>;
  }

  if (isError) {
    return <div>Error logging in via GitHub</div>;
  }

  return null;
};
