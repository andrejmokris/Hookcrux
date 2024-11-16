import { AuthBoundary } from '@/components/navigation/auth-boundary';
import { DashboardPage } from '@/pages/dashboard';
import { Route, Routes } from 'react-router-dom';

export const AuthRoutes = () => {
  return (
    <AuthBoundary>
      <Routes>
        <Route path="/*" Component={DashboardPage} />
      </Routes>
    </AuthBoundary>
  );
};
