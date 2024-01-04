import QuestionCard, { QuestionProps } from '@/components/shared/cards/QuestionCard';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { TagsPageFilters } from '@/constants/filters';
import { auth } from '@clerk/nextjs';
import Filter from '@/components/shared/Filter';

import React from 'react';
import { SearchParamsProps } from '@/types';
import { getSavedQuestion } from '@/lib/actions/question.action';
import { redirect } from 'next/navigation';
import PaginationPage from '@/components/shared/PaginationPage';

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/login');
  }
  const result = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1
  });
  console.log(result);
  return (
    <div>
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="mt-4 flex flex-row items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagsPageFilters}
          containerClasses="max-sm:w-full outline-none w-[180px]"
          otherClasses="min-h-[56px]"
        />
      </div>
      {result.questions.map((question: QuestionProps) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}

      <PaginationPage
        isNext={result.isNext}
        pageNumber={searchParams?.page ? +searchParams.page : 1}
      />
    </div>
  );
};

export default page;
