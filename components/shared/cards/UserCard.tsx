import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { getTopInteractedTags } from '@/lib/actions/tag.action';
import Image from 'next/image';
import Link from 'next/link';

interface UserCardProps {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  picture: string;
  tags: {
    _id: string;
    name: string;
  }[];
}

const UserCard = async (cardProps: UserCardProps) => {
  const interactedTags = await getTopInteractedTags({ userId: cardProps._id });
  return (
    <Card className="flex h-[280px] w-[280px] flex-col items-center rounded-2xl border-none bg-light-900 dark:bg-dark-200 xs:w-[260px]">
      <Link href={`/profile/${cardProps.clerkId}`}>
        <CardHeader className="">
          <Image
            src={cardProps.picture}
            alt={cardProps.username}
            width={100}
            height={100}
            className="aspect-square rounded-full"
          />
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-dark200_light800">{cardProps.name}</CardTitle>
          <CardDescription className="mt-2 text-dark-500 dark:text-light-500">@{cardProps.username}</CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="gap-2">
        {interactedTags.length > 0 ? (
          interactedTags.map((tag) => (
            <Button
              key={tag._id}
              className="body-medium text-light400_light500 h-[30px] w-[70px] rounded-lg bg-light-800  text-xs shadow-md focus:ring-slate-950 focus:ring-offset-2 dark:bg-dark-300">
              {tag.name.substring(0, 4).toLocaleUpperCase() + '...'}
            </Button>
          ))
        ) : (
          <Badge
            className="text-light400_light500"
            variant={'secondary'}>
            rookie
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
export default UserCard;
