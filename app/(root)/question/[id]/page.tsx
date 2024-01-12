import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import ParseHtml from '@/components/shared/ParseHtml';
import Votes from '@/components/shared/Votes';
import Rendertag from '@/components/shared/rightsideBar/Rendertag';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { getTimestamp } from '@/lib/utils';
import { URLProps } from '@/types';
import { auth } from '@clerk/nextjs';

import { Clock, Eye, MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const page = async ({ params, searchParams }: URLProps) => {
  const { id } = params;

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    const result = await getUserById({ userId: clerkId });
    mongoUser = result.user;
  }

  const result = await getQuestionById({ questionId: id });

  return (
    <>
      <div className="flex w-full flex-col ">
        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex flex-row gap-2">
            <Link href={`/profile/${result.question.clerkId}`}>
              <Image
                src={result.question.author.picture}
                alt={result.question.name}
                width={25}
                height={25}
                className="aspect-square rounded-full"
              />
            </Link>
            <p className="text-dark300_light900 font-semibold">{result.question.author.name}</p>
          </div>
          <Votes
            type="Question"
            itemId={JSON.stringify(result.question._id)}
            userId={JSON.stringify(mongoUser._id)}
            upvotes={result.question.upvotes.length}
            hasupVoted={result.question.upvotes.includes(mongoUser._id)}
            downvotes={result.question.downvotes.length}
            hasdownVoted={result.question.downvotes.includes(mongoUser._id)}
            hasSaved={mongoUser?.saved.map((item: any) => item._id.toString()).includes(result.question._id.toString())}
          />
        </div>
        <h1 className="h1-bold mt-2">{result.question.title}</h1>
        <div className="mt-4 flex flex-row items-center gap-6 text-xs">
          <div className="flex flex-row items-center gap-1">
            <Clock className="w-[16px]" />
            <p className="text-dark300_light900">
              <span className="mr-2">asked</span>
              {getTimestamp(result.question.createdAt)}
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <MessageCircleIcon className="w-[16px]" />
            <p className="text-dark300_light900">
              <span className="">{result.question.answers.length} answers</span>
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <Eye className=" w-[16px]" />
            <p className="text-dark300_light900">
              <span className="">{result.question.views} views</span>
            </p>
          </div>
        </div>
        <div className="text-dark300_light900 mt-10">
          <ParseHtml data={result.question.content} />
        </div>
        <div className="mt-12 flex flex-row flex-wrap gap-2">
          {result.question.tags.map((tag: any) => (
            <Rendertag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.questions}
            />
          ))}
        </div>

        {/* Render the answers */}
        <AllAnswers
          questionId={result.question._id}
          userId={mongoUser._id}
          totalAnswers={result.question.answers.length}
          filter={searchParams.filter}
          page={searchParams.page ? +searchParams.page : 1}
        />

        <div>
          <Answer
            question={result.question.content}
            questionId={JSON.stringify(result.question._id)}
            authorId={JSON.stringify(mongoUser._id)}
          />
        </div>
      </div>
    </>
  );
};

export default page;
