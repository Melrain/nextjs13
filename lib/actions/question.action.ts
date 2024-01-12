'use server';

import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionsByIdParams,
  GetQuestionsByTagParams,
  GetQuestionsByUserIdParams,
  GetQuestionsParams,
  GetSavedQuestionParams,
  QuestionVoteParams
} from './shared.types';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';
import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.model';
import { FilterQuery } from 'mongoose';

export async function getQuestionsByUserId(params: GetQuestionsByUserIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const questions = await Question.find({ author: userId })
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: '_id name picture clerkId' })
      .populate({ path: 'answers', model: Answer })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionsByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User, select: '_id name picture clerkId' });
    return { question };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSavedQuestion(params: GetSavedQuestionParams) {
  try {
    await connectToDatabase();
    const { clerkId, searchQuery, filter, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          title: { $regex: new RegExp(searchQuery, 'i') }
        }
      : {};

    let sortOption = {};
    switch (filter) {
      case 'popular':
        sortOption = { upvotes: -1 };
        break;
      case 'recent':
        sortOption = { createdAt: -1 };
        break;
      case 'name':
        sortOption = { title: 1 };
        break;
      case 'old':
        sortOption = { createdAt: 1 };
        break;
      default:
        break;
    }
    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: sortOption,
        skip: skipAmount,
        limit: pageSize
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    });

    const allSavedQuestions = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: sortOption
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    });

    const isNext = allSavedQuestions.saved.length > skipAmount + user.saved.length;

    if (!user) {
      throw new Error('User not found');
    }
    const savedQuestions = user.saved;
    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagParams) {
  try {
    await connectToDatabase();
    const { tagId } = params;
    // go through the Question model and find all the questions that have the tagId in the tags array
    const questions = await Question.find({ tags: { $in: [tagId] } })
      .populate('author')
      .populate('tags')
      .sort({ createdAt: -1 });
    return questions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 2 } = params;

    // 定义一个query对象，用于存储查询条件
    const query: FilterQuery<typeof Question> = {};

    // Calculcate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    // 如果有searchQuery，就把searchQuery放到query对象里面
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } }
      ];
    }

    let sortOption = {};
    switch (filter) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'recommended':
        sortOption = { upvotes: -1 };
        break;
      case 'frequent':
        sortOption = { answers: -1 };
        break;
      case 'unanswered':
        sortOption = { $size: 0 };
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOption);

    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext, skipAmount, totalQuestions, pageSize };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();
    const { title, content, questionId, path } = params;
    const question = await Question.findById(questionId).populate('tags');

    if (!question) {
      throw new Error('Question not found');
    }

    question.title = title;
    question.content = content;

    await question.save();
    revalidatePath(path);
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
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, { $push: { tags: { $each: tagDocuments } } });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by 5
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });
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
      updateQuery = { $pull: { upvotes: userId }, $addToSet: { downvotes: userId } };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const question = await Question.findOneAndUpdate({ _id: questionId }, updateQuery, { new: true });

    if (!question) {
      throw new Error('Question not found');
    }

    // decrease author's reputation by 2 if they downvote a question for first time
    // decrease user's reputation by 1 if they downvote a question for first time
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasdownVoted ? 10 : -10 } });
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasdownVoted ? 1 : -1 } });

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
      updateQuery = { $addToSet: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $addToSet: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Question.findOneAndUpdate({ _id: questionId }, updateQuery, { new: true });

    if (!question) {
      throw new Error('Question not found');
    }
    // increase author's reputation by 10,if they upvote a question for first time
    // increase user's reputation by 1 if they upvote a question for first time
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasupVoted ? -10 : 10 } });
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasupVoted ? -1 : 1 } });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    await connectToDatabase();

    const { questionId, path } = params;

    // decrease author's reputation by 5
    await User.findOneAndUpdate({ questions: questionId }, { $inc: { reputation: -5 } });

    await Question.findByIdAndDelete({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId } });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
