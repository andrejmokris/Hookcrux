import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import useAuth from './hooks/use-auth';
import { GithubCallbackPage } from './pages/auth/github-callback-page';
import LoginPage from './pages/auth/login-page';
import { LandingPage } from './pages/landing-page';
import { SessionPage } from './pages/session-page';
import { AuthRoutes } from './routes/auth-routes';

export default function App() {
  useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/auth/github/callback" element={<GithubCallbackPage />} />
        <Route path="/session/:id" element={<SessionPage />} />
        <Route path="/dashboard/*" element={<AuthRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}
