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

const Account = (): ReactNode => {
  const { user } = useAuth();
  return (
    <div className='flex h-full w-full items-center justify-center p-5'>
      <Tabs defaultValue='account' className='w-[400px]'>
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
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' disabled />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' disabled />
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button disabled>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
