import Image from 'next/image';
import React from 'react';

interface BadgeCardProps {
  image: string;
  accquired: number;
  name: string;
}

const BadgeCard = ({ image, accquired, name }: BadgeCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-row    items-center rounded-md p-8 shadow-light-300 dark:text-white  dark:shadow-dark-200">
      <Image
        src={image}
        alt={name}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <p className="mt-2">{accquired}</p>
        <p>{name} Badges</p>
      </div>
    </div>
  );
};

export default BadgeCard;
