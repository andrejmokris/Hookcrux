import { SignUpForm } from '@/components/auth/sign-up-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Component() {
  return (
    <div className="w-full flex-1 flex items-center justify-center z-20">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Create an account to start using Hookcrux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-400">
          <div>
            Already have an account?{' '}
            <Link to="/sign-in" className="underline text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
