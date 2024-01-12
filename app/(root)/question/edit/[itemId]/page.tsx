import Question from '@/components/forms/Question';
import { getQuestionById } from '@/lib/actions/question.action';
import { auth } from '@clerk/nextjs';
import React from 'react';

interface Props {
  params: {
    itemId: string;
  };
}

const page = async ({ params }: Props) => {
  const { userId } = auth();
  const result = await getQuestionById({ questionId: params.itemId });

  if (!userId) return <div>请先登录</div>;
  if (userId !== result.question.author.clerkId) {
    return <div>你不是这个问题的作者,无权修改！</div>;
  }

  return (
    <div>
      <Question
        questionDetails={JSON.stringify(result.question)}
        mongoUserId={userId}
        type="edit"
      />
    </div>
  );
};

export default page;
