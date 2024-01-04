'use client';
import { Edit, Trash } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useToast } from '../ui/use-toast';
import { deleteQuestion } from '@/lib/actions/question.action';
import { deleteAnswer } from '@/lib/actions/answer.action';

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  console.log('itemId:' + itemId);
  const handleDelete = async () => {
    if (type === 'question') {
      try {
        await deleteQuestion({ questionId: JSON.parse(itemId), path });
        toast({
          title: 'Question deleted',
          description: `${itemId}`
        });
      } catch (error) {
        console.error(error);
      }
    } else if (type === 'answer') {
      try {
        await deleteAnswer({ answerId: JSON.parse(itemId), path });
        toast({
          title: 'Answer deleted',
          description: `${itemId}`
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-row gap-5">
        {type === 'question' && (
          <Edit
            className="w-[15px] cursor-pointer text-blue-500"
            onClick={() => handleEdit()}
          />
        )}

        <Trash
          className="w-[18px] cursor-pointer text-red-500"
          onClick={() => handleDelete()}
        />
      </div>
    </div>
  );
};

export default EditDeleteAction;
