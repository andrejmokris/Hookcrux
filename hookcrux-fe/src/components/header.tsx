import useAuth from '@/hooks/use-auth';
import { Menu, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavUser } from './navigation/user-nav';

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const auth = useAuth();

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
    <header className="relative container mx-auto px-4 py-6 flex justify-between items-center z-10">
      <Link to={'/'} className="flex items-center space-x-2">
        <Zap className="size-5 text-blue-400" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Hookcrux
        </span>
      </Link>
      <nav className="hidden md:flex space-x-6 items-center">
        {!location.pathname.startsWith('/dashboard') && (
          <ul className="flex space-x-6">
            <NavLinks />
          </ul>
        )}

        {auth.isAuthenticated ? <NavUser /> : <Link to={'/sign-in'}>Sign in</Link>}
      </nav>

      <button className="md:hidden text-white" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};
