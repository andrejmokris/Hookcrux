import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Component() {
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email login logic here
    console.log('Email login attempted with:', email);
  };

  const handleGithubLogin = () => {
    const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectURI = `${window.location.origin}/auth/github/callback?${searchParams.get('redirect') ? `redirect=${searchParams.get('redirect')}` : ''}`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50 z-0"></div>
      <Header />
      <div className="w-full flex-1 flex items-center justify-center z-20">
        <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center text-gray-400">Choose your preferred login method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 border border-gray-600 rounded shadow flex items-center justify-center space-x-2"
                onClick={handleGithubLogin}
              >
                <Github className="w-5 h-5" />
                <span>Login with GitHub</span>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Login with Email
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-400">
            <div>
              Don't have an account?{' '}
              <a href="#" className="underline text-blue-400 hover:text-blue-300">
                Sign up
              </a>
            </div>
            <div>
              <a href="#" className="underline text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
