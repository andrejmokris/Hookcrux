import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { GithubCallbackPage } from '@/pages/auth/github-callback-page';
import LoginPage from '@/pages/auth/login-page';
import { LandingPage } from '@/pages/landing-page';
import { SessionPage } from '@/pages/session-page';
import { Route, Routes } from 'react-router-dom';

export const HomeRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50 z-0"></div>
      <Header />
      <main className="flex-grow flex flex-col relative w-full items-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/auth/github/callback" element={<GithubCallbackPage />} />
          <Route path="/session/:id" element={<SessionPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
