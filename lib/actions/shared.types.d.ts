import { IUser } from '@/database/user.model';
import { Schema } from 'mongoose';

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetQuestionsByIdParams {
  questionId: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface CreateAnswerParams {
  content: string;
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  path: string;
}

export interface QuestionVoteParams {
  userId: string;
  questionId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface AnswerVoteParams {
  userId: string;
  answerId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface ToggleSavedQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface VieqQuestionParams {
  questionId: string;
  userId: string | undefined;
}
