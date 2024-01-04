'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { HomePageFilters } from '@/constants/filters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

interface HomeFilterType {
  route: string;
}

const HomeFilters = ({ route }: HomeFilterType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get('filter');
  const [activeButton, setActiveButton] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (activeButton) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'filter',
          value: activeButton
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['filter']
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [activeButton, route, pathname, router, searchParams, query]);

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => {
        return (
          <Button
            onClick={() => {
              setActiveButton(item.value === activeButton ? '' : item.value);
            }}
            key={item.name}
            className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none dark:bg-dark-300 ${
              activeButton === item.value ? 'bg-primary-100 text-primary-500' : 'bg-light-800 text-light-500'
            }`}>
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
