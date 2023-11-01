import React from 'react';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EyeIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react';

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const getHourDiff = (date: Date) => {
  const currentLocalTime = new Date();
  const dateLocalTime = new Date(date);
  const diffInMilliseconds = currentLocalTime.getTime() - dateLocalTime.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  if (diffInSeconds >= 24 * 60 * 60) {
    const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
    return `${diffInDays} day`;
  } else if (diffInSeconds >= 60 * 60) {
    const diffInHours = Math.floor(diffInSeconds / (60 * 60));
    return `${diffInHours} hours`;
  } else if (diffInSeconds >= 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minutes`;
  }

  return `${diffInSeconds} seconds`;
};

const QuestionCard = ({ _id, title, tags, author, upvotes, views, answers, createdAt }: QuestionProps) => {
  return (
    <Card className="card-wrapper flex flex-col border-none p-8">
      <CardTitle>
        <Link
          href={'/'}
          className="sm:h3-semibold text-dark200_light900 base-semibold line-clamp-1 flex-1">
          <h3>{title}</h3>
        </Link>
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
          <span className="text-xs max-sm:hidden">• asked {getHourDiff(createdAt)} ago</span>
        </div>
        <div className="text-dark300_light900 flex flex-row gap-2">
          <ThumbsUpIcon
            size={14}
            color="grey"
          />
          <p className="text-xs">{upvotes} Votes</p>
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
