import { type ReactNode, useState } from 'react';

import { DialogClose } from '@radix-ui/react-dialog';
import { LuTrash2 } from 'react-icons/lu';

import { useToast } from '@/hook/use-toast';
import { useDeleteTransactionAlert } from '@/hook/use-transaction-alert';

import Button from '../atoms/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../atoms/Dialog';

interface DialogDeleteTransactionAlertProps {
  alertId: string;
  onConfirm?: (id: string) => void;
}

const DialogDeleteTransactionAlert = ({
  alertId,
  onConfirm,
}: DialogDeleteTransactionAlertProps): ReactNode => {
  const { toast } = useToast();
  const { mutate: deleteAlert, isLoading } = useDeleteTransactionAlert();
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = () => {
    deleteAlert(alertId, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Alert deleted',
          description: 'The alert was successfully deleted.',
        });
        setOpen(false);
        onConfirm?.(alertId);
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            error.response?.data.message || 'An error occurred while deleting the alert.',
        });
        setOpen(true);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button size='icon' variant='black' aria-label='Delete alert'>
          <LuTrash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your alert.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='black'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='bg-primary'
              isLoading={isLoading}
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteTransactionAlert;
