'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationLink } from '@/components/ui/pagination';
import { formUrlQuery } from '@/lib/utils';

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
}

const PaginationPage = ({ pageNumber, isNext }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === 'prev' ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString()
    });

    router.push(newUrl);
  };
  if (!isNext && pageNumber === 1) return null;
  return (
    <div className="mt-5">
      <Pagination className="items-center">
        <PaginationContent>
          <Button
            className="bg-slate-600 text-white"
            disabled={pageNumber === 1}
            onClick={() => handleNavigation('prev')}>
            Prev
          </Button>
        </PaginationContent>
        <PaginationContent>
          <PaginationLink>
            <p className="text-primary-500">{pageNumber}</p>
          </PaginationLink>
        </PaginationContent>
        <PaginationContent>
          <Button
            className="bg-primary-500 text-white"
            disabled={!isNext}
            onClick={() => handleNavigation('next')}>
            Next
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
