import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';

import mongoose from 'mongoose';
import Link from 'next/link';

interface TagCardProps {
  id?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  numberOfQuestions: number;
}

const TagCard = ({ id, title, description, numberOfQuestions }: TagCardProps) => {
  return (
    <Card className="background-light900_dark200 h-[280px] w-[280px] rounded-2xl border-none">
      <Link href={`/tags/${id}`}>
        <CardHeader className="">
          <CardTitle>
            <Button className="text-dark300_light900 background-light800_dark400 rounded-sm">{title}</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="">
            <p className={'text-dark300_light900 break-words'}>{description}</p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <span className="mr-2 text-sm font-bold text-primary-500">{numberOfQuestions}+</span>
          <p className="text-dark300_light900 text-xs font-semibold">Quetions</p>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TagCard;
