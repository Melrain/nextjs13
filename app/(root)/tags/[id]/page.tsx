import QuestionCard from '@/components/shared/cards/QuestionCard';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';

import { getQuestionsByTagId } from '@/lib/actions/question.action';
import { getTagById } from '@/lib/actions/tag.action';

import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const { id } = params;
  const result = await getQuestionsByTagId({ tagId: id });
  const tag = await getTagById({ tagId: id });
  if (result.length === 0) return <div>Not found</div>;
  return (
    <div>
      <h1 className="h1-bold">{tag.name}</h1>
      <div className="mt-4 flex flex-row items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
      </div>
      {result.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
          tags={question.tags}
        />
      ))}
    </div>
  );
};

export default page;
