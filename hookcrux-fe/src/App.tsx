import { Footer } from './components/footer';
import { Header } from './components/header';
import { LandingPage } from './pages/landing-page';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50"></div>

      <Header />

      <LandingPage />

      <Footer />
    </div>
  );
}
