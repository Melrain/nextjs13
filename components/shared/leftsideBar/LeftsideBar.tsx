'use client';
import { Button } from '@/components/ui/button';
import { sidebarLinks } from '@/constants';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const LeftsideBar = () => {
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6 ">
        {sidebarLinks
          .filter((item) => item.label !== 'Profile')
          .map((item) => {
            const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
            return (
              <div
                key={item.label}
                className={`${
                  isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'
                } flex items-center justify-start gap-4 bg-transparent p-4`}>
                <Link
                  href={item.route}
                  className="flex flex-row items-center gap-2">
                  <Image
                    src={item.imgURL}
                    width={22}
                    height={22}
                    alt={item.label}
                    className={isActive ? '' : 'invert-colors'}
                  />
                  <p className="base-medium whitespace-nowrap dark:text-white max-lg:hidden">{item.label}</p>
                </Link>
              </div>
            );
          })}
        <SignedIn>
          <div className="p-4">
            <Link
              href={'/profile'}
              className="flex flex-row items-center gap-2">
              <Image
                src={'/assets/icons/user.svg'}
                width={22}
                height={22}
                alt="Profile"
                className="invert-colors"
              />
              <p className="base-medium  dark:text-white max-lg:hidden">Profile</p>
            </Link>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="mt-28 flex flex-col items-center gap-3">
            <Link
              href={'sign-in'}
              className="w-full">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
                <Image
                  src={'/assets/icons/account.svg'}
                  width={22}
                  height={22}
                  className="invert-colors lg:hidden"
                  alt="account"
                />
                <span className="dark:text-white max-lg:hidden">Log In</span>
              </Button>
            </Link>
            <Link
              href={'sign-up'}
              className="w-full">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src={'/assets/icons/sign-up.svg'}
                  width={22}
                  height={22}
                  alt="sign-up"
                  className="invert-colors lg:hidden"
                />
                <span className="dark:text-white max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftsideBar;
