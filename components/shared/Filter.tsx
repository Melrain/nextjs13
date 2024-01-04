'use client';
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

type FilterType = {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
};

const Filter = (FilterProps: FilterType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('filter');

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${FilterProps.containerClasses}`}>
      <Select
        defaultValue={query || ''}
        onValueChange={(value) => {
          handleUpdateParams(value);
        }}>
        <SelectTrigger
          className={`${FilterProps.otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FilterProps.filters.map((item) => {
              return (
                <SelectItem
                  className="body-regular text-dark500_light700 hover:background-light700_dark400"
                  key={item.value}
                  value={item.value}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
