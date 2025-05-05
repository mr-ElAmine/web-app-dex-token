import type { ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreateTransactionAlertSchema,
  type CreateTransactionAlertType,
} from '@/configuration/utils/zodParser';
import { useAuth } from '@/hook/use-auth-context';
import { useToast } from '@/hook/use-toast';
import { useCreateTransactionAlert } from '@/hook/use-transaction-alert';

import Button from '../atoms/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../atoms/Form';
import { Input } from '../atoms/Input';

type CreateTransactionAlertFormProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const CreateTransactionAlertForm = ({
  onCancel,
  onSuccess,
}: CreateTransactionAlertFormProps): ReactNode => {
  const { toast } = useToast();
  const { user } = useAuth();
  const form = useForm<CreateTransactionAlertType>({
    resolver: zodResolver(CreateTransactionAlertSchema),
    defaultValues: {
      email: user?.email ?? '',
      address: '',
      chainId: 1,
    },
  });

  const { mutate: createAlert, isLoading } = useCreateTransactionAlert();

  const onSubmit = (data: CreateTransactionAlertType) => {
    createAlert(data, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Transaction alert created',
          description: 'You will now receive alerts at the specified email.',
        });
        onSuccess?.();
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to create alert',
          description: error.response?.data.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='you@example.com' {...field} />
              </FormControl>
              <FormDescription>Enter the email where you want to receive alerts.</FormDescription>
              <FormMessage className='text-red-200' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input type='text' placeholder='0x...' {...field} />
              </FormControl>
              <FormDescription>Enter the wallet address to monitor.</FormDescription>
              <FormMessage className='text-red-200' />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          <Button variant='black' type='button' onClick={onCancel} isLoading={isLoading}>
            Cancel
          </Button>

          <Button isLoading={isLoading} variant='outline' type='submit'>
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTransactionAlertForm;
