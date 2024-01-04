'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

type localSearchBarType = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  otherClasses?: string;
  placeholder: string;
};

const LocalSearchBar = ({ route, iconPosition, imgSrc, otherClasses, placeholder }: localSearchBarType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get('q');
  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q']
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_dark300 relative flex min-h-[56px] w-full grow items-center gap-1 rounded-[10px] px-4 py-3 ${otherClasses}`}>
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt={'search icon'}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className={
          'paragraph-regular no-focus placeholder background-light800_dark300 border-none shadow-none outline-none dark:caret-white'
        }
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
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
