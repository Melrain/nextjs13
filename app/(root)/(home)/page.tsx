import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import Filter from '@/components/shared/Filter';
import HomeFilters from '@/components/home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/shared/cards/QuestionCard';

const questions = [
  {
    _id: 1,
    title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' }
    ],
    author: {
      _id: '123',
      name: 'John Doe',
      picture: '/profile.jpg'
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date('2023-10-20T00:00:00.000Z')
  },
  {
    _id: 2,
    title: 'How to change the style?',
    tags: [
      { _id: '3', name: 'css' },
      { _id: '4', name: 'html' }
    ],
    author: {
      _id: '456',
      name: 'Jane Smith',
      picture: '/avatar.jpg'
    },
    upvotes: 8,
    views: 120,
    answers: [],
    createdAt: new Date('2021-09-02T00:00:00.000Z')
  }
];

export default function Home() {
  const filters = [
    { name: 'newest', value: 'Newest' },
    { name: 'recommended', value: 'Recommended' },
    { name: 'frequent', value: 'Frequent' },
    { name: 'unanswered', value: 'Unanswered' }
  ];
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href={'/ask-question'}
          className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">Ask a Question</Button>
        </Link>
      </div>
      <div className="mt-11 flex  items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={filters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-sm:w-full max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next
          big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
