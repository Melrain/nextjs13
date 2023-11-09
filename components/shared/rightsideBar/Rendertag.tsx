import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import React from 'react';

type TagType = {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
};

const Rendertag = (tagType: TagType) => {
  return (
    <div>
      <Link
        href={`/tags/${tagType._id}`}
        className="flex justify-between gap-2">
        <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
          {tagType.name}
        </Badge>
        {tagType.showCount && <p className="small-medium text-dark500_light700">{tagType.totalQuestions}</p>}
      </Link>
    </div>
  );
};

export default Rendertag;
