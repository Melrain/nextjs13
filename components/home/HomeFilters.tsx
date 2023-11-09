'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { HomePageFilters } from '@/constants/filters';

const HomeFilters = () => {
  const [activeButton, setActiveButton] = useState('newest');
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => {
        return (
          <Button
            onClick={() => {
              setActiveButton(item.value);
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
