import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/footer';
import { Header } from './components/header';
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
      <div className="min-h-screen flex flex-col bg-black text-white w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50 z-0"></div>
        <Header />
        <main className="flex-grow flex relative w-full items-center justify-center">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/auth/github/callback" element={<GithubCallbackPage />} />
            <Route path="/session/:id" element={<SessionPage />} />
            <Route path="/dashboard/*" element={<AuthRoutes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
