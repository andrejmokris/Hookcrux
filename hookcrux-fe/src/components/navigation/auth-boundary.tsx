import useAuth from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';

export const AuthBoundary = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated && !auth.isFetching) {
    return <Navigate to={`/log-in?redirect=${window.location.pathname}`} />;
  }

  return <div>{children}</div>;
};
