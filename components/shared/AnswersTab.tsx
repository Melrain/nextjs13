import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import QuestionCard from './cards/QuestionCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string;
  type?: string;
}

const AnswersTab = async ({ searchParams, userId, clerkId, type }: Props) => {
  const result = await getUserAnswers({ userId });
  return (
    <div>
      {result.answers.map((answer) => (
        <QuestionCard
          clerkId={clerkId}
          key={answer.question._id}
          _id={answer.question._id}
          title={answer.question.title}
          tags={answer.question.tags}
          author={answer.author}
          upvotes={answer.question.upvotes}
          views={answer.question.views}
          answers={answer.question.answers}
          createdAt={answer.question.createdAt}
          type={'answer'}
        />
      ))}
    </div>
  );
};

export default AnswersTab;
