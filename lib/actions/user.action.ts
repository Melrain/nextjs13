'use server';

import { connectToDatabase } from '../mongoose';
import User from '@/database/user.model';
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSavedQuestionParams,
  UpdateUserParams
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';
import { GetAllUsersParams } from '@/types';
import console from 'console';
import Answer from '@/database/answer.model';
import { FilterQuery } from 'mongoose';

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    const allUsers = await User.countDocuments(query);

    let sortOption = {};
    switch (filter) {
      case 'newestUsers':
        sortOption = { joinedAt: -1 };
        break;
      case 'oldUsers':
        sortOption = { joinedAt: 1 };
        break;
      case 'topContributors':
        sortOption = { reputation: -1 };
        break;
      default:
        sortOption = { reputation: -1 };
        break;
    }

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { clerkId: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    const users = await User.find(query).skip(skipAmount).limit(pageSize).sort(sortOption);

    const isNext = allUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId }).populate({
      path: 'saved',
      populate: {
        path: 'author tags'
      }
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);

    return updatedUser;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete user from database
    // and questions, answers, comments, etc

    // get user question ids here
    const userQuestionIds = await Question.find({ author: user._id }).distinct('_id');
    return userQuestionIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function toggleSavedQuestion(params: ToggleSavedQuestionParams) {
  try {
    const { userId, questionId, path } = params;
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      // eslint-disable-next-line no-unused-expressions
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } }, { new: true });
    } else {
      await User.findByIdAndUpdate(userId, { $addToSet: { saved: questionId } }, { new: true });
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const totalAnswers = await Answer.countDocuments({ userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate({
        path: 'question',
        populate: {
          path: 'tags'
        }
      })
      .populate('author', 'id clerkId name picture');

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
