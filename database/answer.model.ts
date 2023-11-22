import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer extends Document {
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  question: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
}

const AnswerSchema: Schema<IAnswer> = new Schema<IAnswer>({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Answer = mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);

export default Answer;
