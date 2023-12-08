import React from 'react';

interface PageUrlProps {
  params: {
    clerkId: string;
  };
  searchParams: string;
}

const page = ({ params, searchParams }: PageUrlProps) => {
  return <div>{params.clerkId}</div>;
};

export default page;
