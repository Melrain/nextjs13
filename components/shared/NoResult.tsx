'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';
import Link from 'next/link';

type NoResultType = {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
};

const NoResult = (props: NoResultType) => {
  const { mode } = useTheme();

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5">
      <Image
        src={mode === 'light' ? '/assets/images/light-illustration.png' : '/assets/images/dark-illustration.png'}
        alt="No result illustration"
        width={300}
        height={300}
      />
      <h2 className="h2-bold text-dark200_light900 max-w-md">{props.title}</h2>
      <p className="body-regular text-dark500_light700 max-w-md">{props.description}</p>
      <Link href={props.link}>
        <Button className="paragraph-medium text-dark500_light700 mt-5 min-h-[4ppx] rounded-lg bg-primary-500 px-4 py-3 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {props.linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
