import mongoose, { Schema } from 'mongoose';
import { PasteDoc } from '../../types';

const badPasteDbSchema: Schema = new mongoose.Schema({
  __id: String,
  uniqueIdentifier: { type: String, unique: true },
  checked: { type: Boolean, default: false },
  source: String,
  title: String,
  language: String,
  posted_by: String,
  body: String,
  badword_count: Number,
  badwords: Array,
  title_sentiment: Number,
  body_sentiment: Number,
  threat_level: Number,
  createdAt: Date || String,
  updatedAt: { type: Date || String, default: new Date() },
});

badPasteDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

export const BadPaste = mongoose.model<PasteDoc>('BadPaste', badPasteDbSchema);
