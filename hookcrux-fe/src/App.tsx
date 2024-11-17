import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import useAuth from './hooks/use-auth';
import { AuthRoutes } from './routes/auth-routes';
import { HomeRoutes } from './routes/home-routes';

export default function App() {
  useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/dashboard/*" element={<AuthRoutes />} />
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}
