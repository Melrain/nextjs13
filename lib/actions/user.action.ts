'use server';

import { connectToDatabase } from '../mongoose';
import User from '@/database/user.model';
import { CreateUserParams, DeleteUserParams, ToggleSavedQuestionParams, UpdateUserParams } from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';
import { GetAllUsersParams } from '@/types';

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

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

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
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
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } }), { new: true };
    } else {
      await User.findByIdAndUpdate(userId, { $addToSet: { saved: questionId } }, { new: true });
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
