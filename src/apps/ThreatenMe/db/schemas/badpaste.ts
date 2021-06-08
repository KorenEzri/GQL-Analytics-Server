import mongoose, { Schema } from 'mongoose';
import { IBadPasteDoc } from '../../../../../types';

const badPasteDbSchema: Schema = new mongoose.Schema({
  source: { type: String, unique: true },
  title: String,
  language: String,
  posted_by: String,
  body: String,
  bad_word_count: Number,
  bad_words: Array,
  sexual_word_count: Number,
  sexual_words: Array,
  sentiment: Object,
  createdAt: Date || String,
  updatedAt: Date || String,
});

badPasteDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

export const BadPaste = mongoose.model<IBadPasteDoc>(
  'BadPaste',
  badPasteDbSchema,
);
