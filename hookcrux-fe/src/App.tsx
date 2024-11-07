import { Menu, Zap } from 'lucide-react';
import { useState } from 'react';
import { Footer } from './components/footer';
import { LandingPage } from './pages/landing-page';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavLinks = () => (
    <>
      <li>
        <a href="#features" className="hover:text-blue-400 transition-colors">
          Features
        </a>
      </li>
      <li>
        <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
          How It Works
        </a>
      </li>
      <li>
        <a href="#get-started" className="hover:text-blue-400 transition-colors">
          Get Started
        </a>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50"></div>

      <header className="relative container mx-auto px-4 py-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <Zap className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Hookcrux
          </span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavLinks />
          </ul>
        </nav>
        <button className="md:hidden text-white" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <LandingPage />

      <Footer />
    </div>
  );
}
