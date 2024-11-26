import { SignInForm } from '@/components/auth/sign-in-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function SignInPage() {
  const [searchParams] = useSearchParams();

  const handleGithubLogin = () => {
    const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectURI = `${window.location.origin}/auth/github/callback?${searchParams.get('redirect') ? `redirect=${searchParams.get('redirect')}` : ''}`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center z-20">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center text-gray-400">Choose your preferred sign-in method</CardDescription>
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
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-400">
          <div>
            Don't have an account?{' '}
            <Link to="/sign-up" className="underline text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </div>
          <div className="hidden">
            <a href="#" className="underline text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
