import * as z from 'zod';

export const QuestionsSchema = z.object({
  title: z.string().min(10).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3)
});

export const AnswerSchema = z.object({
  answer: z.string().min(20).max(10000)
});

export const ProfileSchema = z.object({
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  portfolioLink: z.string().min(0).max(100),
  location: z.string().min(0).max(100),
  bio: z.string().min(0).max(1000)
});
