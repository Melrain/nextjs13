'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileSchema } from '@/lib/validations';
import * as z from 'zod';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { updateUser } from '@/lib/actions/user.action';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Profile = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      portfolioLink: '',
      location: '',
      bio: ''
    }
  });
  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    console.log(values);
    const updateData = {
      clerkId: userId || '',
      name: values.name,
      username: values.username,
      email: values.email,
      bio: values.bio,
      location: values.location,
      portfolioWebsite: values.portfolioLink
    };
    try {
      const updatedUser = await updateUser({ clerkId: userId || '', updateData, path: pathname });
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  username <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>portfolioLink</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant={'secondary'}
              className="primary-gradient mt-5 text-white">
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;
