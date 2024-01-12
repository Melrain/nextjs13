import { Button } from '@/components/ui/button';
import { getUserAnswers, getUserById } from '@/lib/actions/user.action';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import BadgeCard from '@/components/shared/cards/BadgeCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignedIn, auth } from '@clerk/nextjs';
import { URLProps } from '@/types';
import { getQuestionsByUserId } from '@/lib/actions/question.action';
import AnswersTab from '@/components/shared/AnswersTab';
import { redirect } from 'next/navigation';
import QuestionsTab from '@/components/shared/QuestionsTab';

const page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect('login');
  }
  const result = await getUserById({ userId: params.id });
  console.log(result.badgeCount);
  const user = result.user;
  const questionsResult = await getQuestionsByUserId({ userId: user._id });
  const answers = await getUserAnswers({ userId: user._id });

  return (
    <div className="flex flex-col p-12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 max-lg:flex-col">
          <div>
            <Image
              src={user.picture}
              alt={user._id}
              width={150}
              height={150}
              className="aspect-square rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="h2-bold">{user.name}</h2>
            <p>@{user.username}</p>
          </div>
          <div className="flex flex-row gap-1 text-base">
            <CalendarDays /> Joined {user.joinedAt.toDateString()}
          </div>
        </div>
        <div>
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href={'./edit'}>
                <Button className="w-[180px] bg-slate-100 font-sans shadow-md">Edit Profile</Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-5">
        <h3 className="h3-bold">Stats</h3>
        <div className="flex flex-row flex-wrap gap-5">
          <div className="light-border background-light900_dark300 flex flex-row flex-wrap items-center rounded-md p-8  shadow-light-300 dark:text-white  dark:shadow-dark-200">
            <div className="items-center">
              {questionsResult.questions.length}
              <br />
              <span> Questions</span>
            </div>
            <div className="ml-2 items-center">
              {answers.totalAnswers}
              <br />
              <span> Answers</span>
            </div>
          </div>
          <BadgeCard
            image="/assets/icons/gold-medal.svg"
            accquired={result.badgeCount.gold}
            name="黄金"
          />
          <BadgeCard
            image="/assets/icons/silver-medal.svg"
            accquired={result.badgeCount.silver}
            name="白银"
          />
          <BadgeCard
            image="/assets/icons/bronze-medal.svg"
            accquired={result.badgeCount.bronze}
            name="黄铜"
          />
        </div>
      </div>
      <div className="flex flex-row items-start justify-between">
        <div>
          <Tabs
            defaultValue="topPosts"
            className="mt-5">
            <TabsList className=" dark:text-white">
              <TabsTrigger
                value="topPosts"
                className="tab">
                Top Posts
              </TabsTrigger>
              <TabsTrigger
                value="Answers"
                className="tab">
                Answers
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="topPosts"
              className="dark:text-white">
              <QuestionsTab
                userId={user._id}
                searchParams={searchParams}
                clerkId={clerkId}
                type="question"
              />
            </TabsContent>
            <TabsContent
              value="Answers"
              className="dark:text-white">
              <AnswersTab
                clerkId={clerkId}
                userId={user._id}
                searchParams={searchParams}
                type="answer"
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-7 flex flex-col">
          <h3 className="h3-bold">Top Tags</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
