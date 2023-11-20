'use client';
import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

type localSearchBarType = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  otherClasses?: string;
  placeholder: string;
};

const LocalSearchBar = (props: localSearchBarType) => {
  return (
    <div
      className={`background-light800_dark300 relative flex min-h-[56px] w-full grow items-center gap-1 rounded-[10px] px-4 py-3 ${props.otherClasses}`}>
      {props.iconPosition === 'left' && (
        <Image
          src={props.imgSrc}
          width={24}
          height={24}
          alt={'search icon'}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={props.placeholder}
        onChange={() => {}}
        value={''}
        className={
          'paragraph-regular no-focus placeholder background-light800_dark300 border-none shadow-none outline-none dark:caret-white'
        }
      />
      {props.iconPosition === 'right' && (
        <Image
          src={props.imgSrc}
          width={24}
          height={24}
          alt={'search icon'}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
