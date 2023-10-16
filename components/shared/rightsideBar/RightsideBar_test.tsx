import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

type propsType = {
  route: string;
  text: string;
  styles?: string;
};

export const RightsideLink = (props: propsType) => {
  return (
    <Link href={props.route}>
      <div className="flex flex-row justify-between">
        <p className={`text-base dark:text-white ${props.styles}`}>{props.text}</p>
        <Image
          src={'/assets/icons/chevron-right.svg'}
          alt="arrow-right"
          width={20}
          height={20}
          className="invert-colors"
        />
      </div>
    </Link>
  );
};

export const RightsideContent = [
  {
    route: '/',
    question: 'Best Practices for data fetching in a Next.js application with Server-Side Rendering (SSR)'
  },
  { route: '/', question: 'Can i get the course for free' },
  { route: '/', question: 'Redux Toolkit Not Updating State as Expected' },
  { route: '/', question: 'Async/Await Function Not Handling Errors Properly' },
  { route: '/', question: 'How do I use express as a custom server in NextJS' }
];

export const RightsideTags = [
  { tag: 'NEXTJS', count: 10 },
  { tag: 'NEXT JS', count: 4 },
  { tag: 'REACT', count: 4 },
  { tag: 'CSS', count: 4 },
  { tag: 'JAVASCRIPT', count: 3 }
];

const RightsideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 sticky right-0  top-0 flex h-screen w-fit flex-col border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="h2-bold dark:text-white">Top Questions</h2>
        {RightsideContent.map((item) => {
          return (
            <RightsideLink
              key={item.route}
              route={item.route}
              text={item.question}
            />
          );
        })}
        <div className="mt-24">
          <h2 className="h2-bold mb-4 dark:text-white">Popular Tags</h2>
          {RightsideTags.map((item) => {
            return (
              <Link
                href={'/'}
                key={item.tag}
                className="flex flex-row justify-between pt-2">
                <div className="rounded-lg bg-slate-500 p-1 dark:text-white">{item.tag}</div>
                <div className="ml-2 text-base dark:text-white">{item.count}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightsideBar;
