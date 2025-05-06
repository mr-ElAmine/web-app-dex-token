import type { ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { ChangePasswordSchema } from '@/configuration/utils/zodParser';
import { useChangePassword } from '@/hook/use-auth';
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

type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

type ChangePasswordFormProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const ChangePasswordForm = ({ onCancel, onSuccess }: ChangePasswordFormProps): ReactNode => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { mutate: changePassword, isPending } = useChangePassword();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
    changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Password changed',
            description: 'Your password has been updated. Please log in again.',
          });
          onSuccess?.();
          form.reset();
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: 'Change failed',
            description: error.response?.data.message ?? 'Unable to change password.',
          });
        },
      },
    );
  };

  return (
    <Card className='w-full max-w-[400px]'>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
                  </FormControl>
                  <FormDescription>Enter your current password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters, include an uppercase letter and a number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
                  </FormControl>
                  <FormDescription>Re-enter your new password for confirmation.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={onCancel} isLoading={isPending}>
              Cancel
            </Button>
            <Button type='submit' variant='black' isLoading={isPending}>
              Save password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangePasswordForm;
