'use server';
import Tag from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTagByIdParams, GetTopInteractedTagsParams } from './shared.types';
import User from '@/database/user.model';
import { FilterQuery } from 'mongoose';

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
    const { searchQuery, filter, page = 1, pageSize = 2 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = searchQuery
      ? {
          name: { $regex: new RegExp(searchQuery, 'i') }
        }
      : {};
    let sortOption = {};
    switch (filter) {
      case 'popular':
        sortOption = { questions: -1 };
        break;
      case 'recent':
        sortOption = { createdAt: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'old':
        sortOption = { createdAt: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query).skip(skipAmount).limit(pageSize).sort(sortOption);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTagById(params: GetTagByIdParams) {
  try {
    await connectToDatabase();
    const { tagId } = params;
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error('Tag not found');
    return tag;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
