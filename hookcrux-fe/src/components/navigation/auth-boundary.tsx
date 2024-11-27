import useAuth from '@/hooks/use-auth';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthBoundary = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated && !auth.isFetching) {
    return <Navigate to={`/sign-in?redirect=${location.pathname + location.search}`} />;
  }

  return <div>{children}</div>;
};
