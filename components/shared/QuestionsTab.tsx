import React from 'react';
import QuestionCard from './cards/QuestionCard';
import { SearchParamsProps } from '@/types';
import { getQuestionsByUserId } from '@/lib/actions/question.action';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string;
  type?: string;
}
const QuestionsTab = async ({ searchParams, userId, clerkId, type }: Props) => {
  const result = await getQuestionsByUserId({ userId });

  return (
    <div>
      {result.questions.map((question) => (
        <QuestionCard
          clerkId={question.author.clerkId}
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
          type="question"
        />
      ))}
    </div>
  );
};

export default QuestionsTab;
