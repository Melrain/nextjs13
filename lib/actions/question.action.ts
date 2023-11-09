'use server';

import { connectToDatabase } from '../mongoose';
import console from 'console';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();
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
