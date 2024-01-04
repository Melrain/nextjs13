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
  searchQuery?: string;
}

export interface GetQuestionsByIdParams {
  page?: number;
  pageSize?: number;
  questionId: string;
}

export interface GetSavedQuestionParams {
  page?: number;
  pageSize?: number;
  clerkId: string;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
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
  filter?: string;
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

export interface GetQuestionsByTagParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface GetTagByIdParams {
  tagId: string;
}

export interface GetQuestionsByUserIdParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface GetAnswersByUserId {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

export interface GlobalSearchParams {
  query?: string;
  type?: string;
}

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}
