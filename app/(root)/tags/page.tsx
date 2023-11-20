import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { TagsPageFilters } from '@/constants/filters';
import Filter from '@/components/shared/Filter';
import React from 'react';
import { getAllTags } from '@/lib/actions/tag.action';
import TagCard from '@/components/shared/cards/TagCard';
import NoResult from '@/components/shared/NoResult';

const page = async () => {
  const result = await getAllTags({});
  console.log(result);

  return (
    <section className="flex w-full flex-col flex-wrap">
      <h1 className="h1-bold text-dark300_light900">Tags</h1>
      <div className="mt-4 flex flex-row items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagsPageFilters}
          containerClasses="max-sm:w-full outline-none w-[180px]"
          otherClasses="min-h-[56px]"
        />
      </div>
      <div className="mt-12 flex flex-row flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => {
            return (
              <TagCard
                key={tag._id}
                id={tag._id}
                title={tag.name}
                description="lol"
                numberOfQuestions={tag.questions.length}
              />
            );
          })
        ) : (
          <NoResult
            title="No Tags Found!"
            description="There are no tags in the database"
            link="/"
            linkTitle="Go back to home page"
          />
        )}
      </div>
    </section>
  );
};

export default page;
