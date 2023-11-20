import Answer from '@/components/forms/Answer';
import ParseHtml from '@/components/shared/ParseHtml';
import Rendertag from '@/components/shared/rightsideBar/Rendertag';
import { getQuestionById } from '@/lib/actions/question.action';
import { getTimestamp } from '@/lib/utils';
import { ArrowBigDown, ArrowBigUp, Clock, Eye, MessageCircleIcon, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PageUrlProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageUrlProps) => {
  const { id } = params;

  const result = await getQuestionById({ questionId: id });

  console.log(result);

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
          <div className="flex flex-row items-center gap-2">
            <ArrowBigUp className="cursor-pointer text-gray-500" />
            <p className="background-light700_dark400 min-w-[18px] text-center text-xs">{result.upvotes.length}</p>
            <ArrowBigDown className="cursor-pointer text-gray-500" />
            <p className="background-light700_dark400 min-w-[18px] text-center text-xs">{result.downvotes.length}</p>
            <Star className="ml-2 cursor-pointer text-yellow-500" />
          </div>
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
        <div className="mt-10">
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
        <div>
          <Answer />
        </div>
      </div>
    </>
  );
};

export default page;
