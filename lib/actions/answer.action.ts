'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersByUserId,
  GetAnswersParams
} from './shared.types';
import Answer from '@/database/answer.model';
import { revalidatePath } from 'next/cache';
import Interaction from '@/database/interaction.model';
import User from '@/database/user.model';

export async function getAnswersByUserId(params: GetAnswersByUserId) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const answers = await Answer.find({ author: userId })
      .populate({ path: 'author', select: '_id name picture' })
      .sort({ createdAt: -1 });
    return answers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();

    const { content, author, question, path } = params;

    // add answer to database
    const newAnswer = await Answer.create({
      content,
      author,
      question,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      upvotes: [],
      downvotes: []
    });

    await Question.findByIdAndUpdate(question, { $addToSet: { answers: newAnswer._id } });

    // Increment author's reputation by 5
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();
    const { questionId, filter, page = 1, pageSize = 2 } = params;
    const skipAmount = (page - 1) * pageSize;
    let sortOption = {};

    switch (filter) {
      case 'highestUpvotes':
        sortOption = { upvotes: -1 };
        break;
      case 'lowestUpvotes':
        sortOption = { upvotes: 1 };
        break;
      case 'recent':
        sortOption = { createdAt: -1 };
        break;
      case 'old':
        sortOption = { createdAt: 1 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOption)
      .populate('author');
    const allAnswers = await Answer.find({ question: questionId }).countDocuments();
    const isNext = allAnswers > skipAmount + answers.length;
    return { answers, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $addToSet: { downvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error('Answer not found');
    }

    // Decrease author's reputation by 10 if it's user's first downvote
    // Decrease user's reputation by 2 if it's user's first downvote
    await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasdownVoted ? 10 : -10 } });
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasdownVoted ? 2 : -2 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

    if (!answer) {
      throw new Error('Answer not found');
    }

    // Increment author's reputation by 10 if it's user's first upvote
    // Increment user's reputation by 2 if it's user's first upvote
    await User.findByIdAndUpdate(answer.author, { $inc: { reputation: hasupVoted ? -10 : 10 } });
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasupVoted ? -2 : 2 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    connectToDatabase();
    const { answerId, path } = params;
    const answer = await Answer.findOne({ question: answerId });
    await Answer.deleteOne({ question: answerId });
    await Question.updateMany({ _id: answer.question._id }, { $pull: { answers: answer._id } });
    await Interaction.deleteMany({ question: answerId });

    // Decrease author's reputation by 5
    await User.findOneAndUpdate({ answers: answerId }, { $inc: { reputation: -5 } });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
