'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import { VieqQuestionParams } from './shared.types';
import Interaction from '@/database/interaction.model';

export async function viewQuestion(params: VieqQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;

    // update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    // check if user has viewed this question before
    if (userId) {
      const existingInteraction = await Interaction.findOne({ user: userId, action: 'view', question: questionId });
      if (existingInteraction) return console.log('User has already viewed this question');
      await Interaction.create({ user: userId, action: 'view', question: questionId });
    }

    // create new interaction
  } catch (error) {
    console.error(error);
    throw error;
  }
}
