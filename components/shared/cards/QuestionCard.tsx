import React from 'react';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EyeIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react';
import { getTimestamp } from '@/lib/utils';
import EditDeleteAction from '../EditDeleteAction';

export interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: Array<object>;
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string;
  type?: string;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  clerkId,
  type
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Card className="card-wrapper flex flex-col border-none p-8">
      <CardTitle className="flex flex-row">
        <Link
          href={`/question/${_id}`}
          className="sm:h3-semibold text-dark200_light900 base-semibold line-clamp-1 flex-1">
          <h3>{title}</h3>
        </Link>

        {showActionButtons && (
          <EditDeleteAction
            type={type || ''}
            itemId={JSON.stringify(_id)}
          />
        )}
      </CardTitle>
      <CardContent className="p-0">
        <Link
          href={'/'}
          className="mt-3 flex flex-row gap-2">
          {tags.map((tag) => (
            <Button
              className="body-medium rounded-lg border-transparent bg-slate-100 px-5 py-2 text-xs capitalize text-light-500 shadow dark:bg-dark-300 dark:hover:bg-slate-900/80"
              key={tag._id}>
              {tag.name}
            </Button>
          ))}
        </Link>
      </CardContent>
      <CardFooter className="mt-6 flex flex-col items-start justify-between gap-3  p-0 max-sm:flex-row lg:flex-row">
        <div className="text-dark300_light900 flex flex-row items-center gap-2">
          <Image
            src={author.picture}
            width={15}
            height={15}
            alt={author.name}
          />
          <p className="body-medium">{author.name}</p>
          <span className="text-xs max-sm:hidden">• asked {getTimestamp(createdAt)}</span>
        </div>
        <div className="text-dark300_light900 flex flex-row gap-2">
          <ThumbsUpIcon
            size={14}
            color="grey"
          />
          <p className="text-xs">{upvotes.length} Votes</p>
          <MessageCircleIcon
            size={14}
            color="grey"
            className="ml-2"
          />
          <p className="text-xs">{answers.length} Answers</p>
          <EyeIcon
            className="ml-2"
            size={14}
            color="grey"
          />
          <p className="text-xs">{views} Views</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
