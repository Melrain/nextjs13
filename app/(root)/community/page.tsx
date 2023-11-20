import Filter from '@/components/shared/Filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import React from 'react';
import UserCard from '@/components/shared/cards/UserCard';
import { CommunityPageFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import { Link } from 'lucide-react';

const community = async () => {
  // get all users from database
  const users = await getAllUsers({});

  // TODO: get top 3 tags from given user

  const topThreeTags = [
    { _id: 'nextjs', name: 'Nextjs' },
    { _id: 'javascript', name: 'Javascript' },
    { _id: 'react', name: 'React' }
  ];

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mx-auto mt-12 w-full max-w-5xl">
        <div className="mt-4 flex flex-row items-center justify-between gap-5 max-sm:flex-col">
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search amazing minds here..."
            otherClasses="flex-1"
          />
          <Filter
            filters={CommunityPageFilters}
            containerClasses="max-sm:w-full outline-none w-[180px]"
            otherClasses="min-h-[56px]"
          />
        </div>
        <div className="mt-12 flex">
          {users.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-4 ">
              {users.map((user) => (
                <UserCard
                  clerkId={user.clerkId}
                  key={user.name}
                  _id={user._id}
                  name={user.name}
                  username={user.username}
                  picture={user.picture}
                  tags={topThreeTags}
                />
              ))}
            </div>
          ) : (
            <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
              <p>No users yet</p>
              <Link
                href="/sign-up"
                className="mt-2 font-bold text-accent-blue">
                Join to be the first
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default community;
