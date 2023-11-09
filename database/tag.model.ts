import mongoose from 'mongoose';

export interface ITag extends mongoose.Document {
  name: string;
  description: string;
  questions: mongoose.Schema.Types.ObjectId[];
  follower: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const tagSchema = new mongoose.Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follower' }],
  createdAt: { type: Date, default: Date.now }
});

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);

export default Tag;
