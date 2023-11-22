'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams } from './shared.types';
import Answer from '@/database/answer.model';
import { revalidatePath } from 'next/cache';

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

    await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
