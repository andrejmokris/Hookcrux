import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { LandingPage } from './pages/landing-page';
import { SessionPage } from './pages/session-page';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50"></div>

      <Header />

      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/session/:id" Component={SessionPage} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
