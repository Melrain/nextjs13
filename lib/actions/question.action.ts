'use server';

import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import { CreateQuestionParams, GetQuestionsByIdParams, GetQuestionsParams, QuestionVoteParams } from './shared.types';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';

export async function getQuestionById(params: GetQuestionsByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: '_id name picture' });
    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB
    await connectToDatabase();
    // destructure params
    // path is the url path of the Homepage, to revalidate this page, so the nextjs server will re-render this page
    const { title, tags, content, author, path } = params;
    // create new question
    const question = await Question.create({
      title,
      content,
      author
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag);
    }
    await Question.findByIdAndUpdate(question._id, { $push: { tags: { $each: tagDocuments } } });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by 5

    // 重新刷新页面
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    await connectToDatabase();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } };
    } else {
      updateQuery = { $push: { downvotes: userId } };
    }
    const question = await Question.findOneAndUpdate({ _id: questionId }, updateQuery, { new: true });

    if (!question) {
      throw new Error('Question not found');
    }
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    await connectToDatabase();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } };
    } else {
      updateQuery = { $push: { upvotes: userId } };
    }
    const question = await Question.findOneAndUpdate({ _id: questionId }, updateQuery, { new: true });

    if (!question) {
      throw new Error('Question not found');
    }
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
