import { apiClient } from '@/lib/api';
import authStore from '@/stores/auth-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface UserState {
  isLoading: boolean;
  isFetching: boolean;
  isAuthenticated: boolean;
  user: User | null;
  logOut: () => void;
  githubLogin: (githubToken: string) => Promise<accessToken>;
}

const useAuth = (): UserState => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const authState = authStore();

  const { isLoading, isFetching } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token provided.');
        }
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data } = await apiClient.get<User>('/users/me');
        authState.signIn(data);
        return data;
      } catch {
        authState.signOut();
        return null;
      }
    },
    refetchOnMount: false,
  });

  const githubLogin = async (githubToken: string) => {
    const { data } = await apiClient.post<accessToken>('/auth/github', { code: githubToken });
    localStorage.setItem('accessToken', data.accessToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
    queryClient.invalidateQueries({
      queryKey: ['auth'],
    });
    navigate(searchParams.get('redirect') ?? '/dashboard');
    return data;
  };

  const logOut = () => {
    authState.signOut();
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
    queryClient.invalidateQueries({
      queryKey: ['auth'],
    });
    navigate('/');
  };

  return {
    isLoading,
    isFetching,
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    logOut: logOut,
    githubLogin: githubLogin,
  };
};

export default useAuth;
