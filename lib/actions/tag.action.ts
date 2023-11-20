'use server';
import Tag from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types';
import User from '@/database/user.model';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // Find interactions for the user and group by tags...
    // Interaction...
    return [
      { _id: 1, name: 'nextjs' },
      { _id: 2, name: 'javascript' },
      { _id: 3, name: 'reactjs' }
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
