import type { ReactNode } from 'react';

import { useAuth } from '@/hook/use-auth-context';

import Button from '../atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../atoms/Card';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/Tabs';
import ChangePasswordForm from '../form/ChangePasswordForm';

const Account = (): ReactNode => {
  const { user } = useAuth();
  return (
    <div className='flex h-full w-full justify-center p-5'>
      <Tabs defaultValue='account' className='mt-10 w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='username'>Email</Label>
                <Input id='username' defaultValue={user?.email} disabled />
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button disabled>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='password'>
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
