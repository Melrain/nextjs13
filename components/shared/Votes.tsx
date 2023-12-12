'use client';

import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { toggleSavedQuestion } from '@/lib/actions/user.action';
import { viewQuestion } from '@/lib/actions/interaction.action';

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({ type, itemId, userId, upvotes, downvotes, hasupVoted, hasdownVoted, hasSaved }: Props) => {
  const handleSave = async () => {
    await toggleSavedQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path
    });
  };
  const path = usePathname();
  const router = useRouter();

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: path
        });
      } else if (type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: path
        });
      }

      // todo: show a toast
      return;
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: path
        });
      } else if (type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: path
        });
      }

      // todo: show a toast
    }
  };

  useEffect(() => {
    if (itemId && userId && path && router) {
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId)
      });
    }
  }, [itemId, userId, path, router]);

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <div>
          <ArrowBigUp
            className={`cursor-pointer ${hasupVoted ? 'text-green-500' : 'text-gray-500 '}`}
            onClick={() => {
              handleVote('upvote');
            }}
          />
        </div>

        <p className="background-light700_dark400 min-w-[18px] text-center text-xs">{upvotes}</p>

        <div>
          <ArrowBigDown
            className={`cursor-pointer  ${hasdownVoted ? 'text-red-500' : 'text-gray-500'}`}
            onClick={() => {
              handleVote('downvote');
            }}
          />
        </div>

        <p className="background-light700_dark400 min-w-[18px] text-center text-xs">{downvotes}</p>
        {type === 'Answer' ? (
          ''
        ) : (
          <Image
            alt="star"
            width={18}
            height={18}
            src={`/assets/icons/${hasSaved ? 'star-filled.svg' : 'star-red.svg'}`}
            className="ml-2 cursor-pointer"
            onClick={() => {
              console.log('saved button clicked');
              handleSave();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Votes;
