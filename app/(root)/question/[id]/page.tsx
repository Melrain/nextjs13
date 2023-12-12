import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';

import ParseHtml from '@/components/shared/ParseHtml';
import Votes from '@/components/shared/Votes';
import Rendertag from '@/components/shared/rightsideBar/Rendertag';
import { getAllAnswers } from '@/lib/actions/answer.action';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { getTimestamp } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { ArrowBigDown, ArrowBigUp, Clock, Eye, MessageCircleIcon, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PageUrlProps {
  params: {
    id: string;
  };
  searchParams: string;
}

const page = async ({ params, searchParams }: PageUrlProps) => {
  const { id } = params;
  const result = await getQuestionById({ questionId: id });
  console.log('result:' + result);
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex w-full flex-col ">
        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex flex-row gap-2">
            <Link href={`/profile/${result.clerkId}`}>
              <Image
                src={result.author.picture}
                alt={result.name}
                width={25}
                height={25}
                className="aspect-square rounded-full"
              />
            </Link>
            <p className="text-dark300_light900 font-semibold">{result.author.name}</p>
          </div>
          <Votes
            type="Question"
            itemId={JSON.stringify(result._id)}
            userId={JSON.stringify(mongoUser._id)}
            upvotes={result.upvotes.length}
            downvotes={result.downvotes.length}
            hasupVoted={result.upvotes.includes(mongoUser._id)}
            hasdownVoted={result.downvotes.includes(mongoUser._id)}
            hasSaved={mongoUser.saved.includes(result._id)}
          />
        </div>
        <h1 className="h1-bold mt-2">{result.title}</h1>
        <div className="mt-4 flex flex-row items-center gap-6 text-xs">
          <div className="flex flex-row items-center gap-1">
            <Clock className="w-[16px]" />
            <p className="text-dark300_light900">
              <span className="mr-2">asked</span>
              {getTimestamp(result.createdAt)}
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <MessageCircleIcon className="w-[16px]" />
            <p className="text-dark300_light900">
              <span className="">{result.answers.length} answers</span>
            </p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <Eye className=" w-[16px]" />
            <p className="text-dark300_light900">
              <span className="">{result.views} views</span>
            </p>
          </div>
        </div>
        <div className="mt-10 text-dark300_light900">
          <ParseHtml data={result.content} />
        </div>
        <div className="mt-12 flex flex-row flex-wrap gap-2">
          {result.tags.map((tag: any) => (
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
          questionId={result._id}
          userId={mongoUser._id}
          totalAnswers={result.answers.length}
        />
        <div>
          <Answer
            question={result.content}
            questionId={JSON.stringify(result._id)}
            authorId={JSON.stringify(mongoUser._id)}
          />
        </div>
      </div>
    </>
  );
};

export default page;
