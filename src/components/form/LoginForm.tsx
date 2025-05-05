import { type ReactNode, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { LoginSchema } from '@/configuration/utils/zodParser';
import { useLogin } from '@/hook/use-auth';
import { useAuth } from '@/hook/use-auth-context';
import { useToast } from '@/hook/use-toast';

import Button from '../atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../atoms/Card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../atoms/Form';
import { Input } from '../atoms/Input';

import type { z } from 'zod';

type LoginValues = z.infer<typeof LoginSchema>;

const LoginForm = (): ReactNode => {
  const { toast } = useToast();
  const { login: authLogin } = useAuth();
  const { mutate: login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginValues> = (values) => {
    login(values, {
      onSuccess: (rep) => {
        authLogin(rep.data.accessToken, rep.data.refreshToken);
        toast({
          variant: 'success',
          title: 'Login successful!',
          description: 'You have been signed in.',
        });
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: error.response?.data.message,
        });
      },
    });
  };

  return (
    <Card className='w-full max-w-xl border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-5xl font-light'>Sign In</CardTitle>
        <CardDescription className='font-bold'>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='Your email address' {...field} />
                  </FormControl>
                  <FormDescription>Enter the email linked to your account.</FormDescription>
                  <FormMessage className='text-red-200' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Your password'
                      {...field}
                      Icon={showPassword ? EyeOff : Eye}
                      onIconClick={() => setShowPassword((prev) => !prev)}
                    />
                  </FormControl>
                  <FormDescription>Enter your password to sign in.</FormDescription>
                  <FormMessage className='text-red-200' />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className='flex justify-end'>
            <Button type='submit' variant='black' disabled={isLoading} isLoading={isLoading}>
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
