import mongoose from 'mongoose';

// type of interaction
export interface IInteraction extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  action: string;
  question: mongoose.Schema.Types.ObjectId;
  answer: mongoose.Schema.Types.ObjectId;
  tags: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

// schema of interaction
const IInteractionSchema = new mongoose.Schema<IInteraction>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  tags: { type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' },
  createdAt: { type: Date, default: Date.now }
});

// check if model exists;if not create it
const Interaction = mongoose.models.ViewQuestion || mongoose.model('Interaction', IInteractionSchema);

export default Interaction;
