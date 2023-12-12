import { getAllAnswers } from '@/lib/actions/answer.action';
import React from 'react';
import ParseHtml from './ParseHtml';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import Filter from './Filter';
import { AnswerFilters } from '@/constants/filters';
import Votes from './Votes';
import { getUserById } from '@/lib/actions/user.action';

interface AnswerProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}
const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: AnswerProps) => {
  const answers = await getAllAnswers({ questionId });
  console.log('answers:' + answers);
  console.log(answers[0].downvotes.includes(userId));

  return (
    <div>
      <div className="mt-12 flex flex-row items-center justify-between">
        <p className=" text-dark400_light800 text-primary-500">{totalAnswers} Answers</p>
        <div>
          <Filter filters={AnswerFilters} />
        </div>
      </div>
      {answers.map((answer) => (
        <article
          key={answer._id}
          className="mt-12">
          <div className="flex flex-row justify-between gap-2">
            <Link
              href={`/profile/${userId}`}
              className="flex flex-row items-center gap-2">
              <div>
                <Image
                  src={answer.author.picture}
                  alt={answer.name}
                  width={25}
                  height={25}
                  className="aspect-square rounded-full"
                />
              </div>
              <p className="text-dark300_light900 font-semibold">{answer.author.name}</p>
              <div className="flex flex-row flex-wrap items-center gap-1">
                <p className="text-dark300_light900">
                  <span className="mr-2">•answered</span>
                  {getTimestamp(answer.createdAt)}
                </p>
              </div>
            </Link>
            <Votes
              type="Answer"
              itemId={JSON.stringify(answer._id)}
              userId={JSON.stringify(userId)}
              upvotes={answer.upvotes.length}
              hasupVoted={answer.upvotes.includes(userId)}
              downvotes={answer.downvotes.length}
              hasdownVoted={answer.downvotes.includes(userId)}
            />
          </div>
          <div className="mt-4 text-dark300_light900">
            <ParseHtml data={answer.content} />
          </div>
          <hr className="mt-20" />
        </article>
      ))}
    </div>
  );
};

export default AllAnswers;
