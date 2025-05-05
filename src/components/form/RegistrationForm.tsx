import { useState, type ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { RegistrationSchema } from '@/configuration/utils/zodParser';
import { useRegister } from '@/hook/use-auth';
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

type RegistrationValues = z.infer<typeof RegistrationSchema>;

const RegistrationForm = (): ReactNode => {
  const { toast } = useToast();
  const { mutate: register, isLoading } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<RegistrationValues> = (values) => {
    register(values, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Registration successful!',
          description: 'Your account has been created successfully.',
        });
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description: error.response?.data.message,
        });
      },
    });
  };

  return (
    <Card className='w-full max-w-xl border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-5xl font-light'>Sign Up</CardTitle>
        <CardDescription className='font-bold'>
          Create your account by filling out the form below.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Your full name' {...field} />
                  </FormControl>
                  <FormDescription>Enter your full name</FormDescription>
                  <FormMessage className='text-red-200' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='Your email address' {...field} />
                  </FormControl>
                  <FormDescription>We'll only use your email to contact you.</FormDescription>
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
                      placeholder='Choose a password'
                      {...field}
                      Icon={showPassword ? EyeOff : Eye}
                      onIconClick={() => setShowPassword((prev) => !prev)}
                    />
                  </FormControl>
                  <FormDescription>Must contain at least 8 characters.</FormDescription>
                  <FormMessage className='text-red-200' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder='Re-enter your password'
                      {...field}
                      Icon={showConfirm ? EyeOff : Eye}
                      onIconClick={() => setShowConfirm((prev) => !prev)}
                    />
                  </FormControl>
                  <FormDescription>Make sure your passwords match.</FormDescription>
                  <FormMessage className='text-red-200' />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className='flex justify-end'>
            <Button type='submit' variant='black' disabled={isLoading} isLoading={isLoading}>
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
