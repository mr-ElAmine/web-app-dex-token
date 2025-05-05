import { type ReactNode, useState } from 'react';

import { LuBellPlus } from 'react-icons/lu';

import Button from '../atoms/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../atoms/Dialog';
import CreateTransactionAlertForm from '../form/CreateTransactionAlertForm.';

const DialogCreateTransactionAlert = ({ onSuccess }: { onSuccess?: () => void }): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button
          variant='black'
          aria-label='Delete alert'
          className='flex items-center justify-center'
        >
          <LuBellPlus /> create Transaction Alert
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your alert.
          </DialogDescription>
        </DialogHeader>
        <CreateTransactionAlertForm
          onSuccess={() => {
            onSuccess?.();
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTransactionAlert;
