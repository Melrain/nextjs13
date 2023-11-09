import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Rendertag from './Rendertag';

const hotQuestions = [
  {
    _id: 1,
    title: 'Best Practices for data fetching in a Next.js application with Server-Side Rendering (SSR)'
  },
  { _id: 2, title: 'Can i get the course for free' },
  { _id: 3, title: 'Redux Toolkit Not Updating State as Expected' },
  { _id: 4, title: 'Async/Await Function Not Handling Errors Properly' },
  { _id: 5, title: 'How do I use express as a custom server in NextJS' }
];

const popularTags = [
  { _id: 1, name: 'NEXTJS', totalQuestions: 10 },
  { _id: 2, name: 'NEXT JS', totalQuestions: 4 },
  { _id: 3, name: 'REACT', totalQuestions: 4 },
  { _id: 4, name: 'CSS', totalQuestions: 4 },
  { _id: 5, name: 'JAVASCRIPT', totalQuestions: 3 }
];

const RightsideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 sticky right-0  top-0 flex h-screen w-fit flex-col border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7">
              <p className="body-medium text-dark500_light700">{question.title}</p>
              <Image
                src={'/assets/icons/chevron-right.svg'}
                width={20}
                height={20}
                alt="chevron right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className=" mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <Rendertag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightsideBar;
