'use client';

import { type ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { EmailOTPSchema } from '@/configuration/utils/zodParser';
import { useSendEmailVerification, useVerifyEmail } from '@/hook/use-auth';
import { useAuth } from '@/hook/use-auth-context';
import { toast } from '@/hook/use-toast';

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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../atoms/InputOTP';

import type { z } from 'zod';

type OTPValues = z.infer<typeof EmailOTPSchema>;

const EmailVerifiedForm = (): ReactNode => {
  const form = useForm<OTPValues>({
    resolver: zodResolver(EmailOTPSchema),
    defaultValues: { pin: '' },
  });

  const { refreshTokensManually } = useAuth();
  const sendEmailVerification = useSendEmailVerification();
  const verifyEmail = useVerifyEmail();

  const onSubmit: SubmitHandler<OTPValues> = (pin) => {
    verifyEmail.mutate(pin, {
      onSuccess: async () => {
        await refreshTokensManually();
        toast({
          variant: 'success',
          title: 'Email verified!',
          description: 'Your email has been successfully verified.',
        });
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: 'The code is invalid or expired. Please try again.',
        });
        console.error(error);
      },
    });
  };

  const handleResend = () => {
    sendEmailVerification.mutate(undefined, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Code resent',
          description: 'A new verification code has been sent to your email.',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Resend failed',
          description: 'Unable to resend code. Please try again later.',
        });
      },
    });
  };

  return (
    <Card className='w-full max-w-[370px] border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-5xl font-light'>Enter Your Code</CardTitle>
        <CardDescription className='font-bold'>
          Enter the 6-digit code sent to your email.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <InputOTPSlot key={idx} index={idx} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>Please enter your nine-digit code.</FormDescription>
                  <FormMessage className='text-red-200' />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => handleResend()}>
              Resend Code
            </Button>
            <Button type='submit' variant='black'>
              Verify Code
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default EmailVerifiedForm;
