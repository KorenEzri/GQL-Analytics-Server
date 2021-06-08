import { Document } from 'mongoose';

interface ISentiment {
  score: number;
  comparative: number;
  calculation: any[];
  words: string[];
  positive: string[];
  negative: string[];
}
export interface IBadPaste {
  __id: string;
  source: string;
  title: string;
  language: string;
  posted_by: string;
  body: string;
  bad_word_count: number;
  bad_words: string[];
  sexual_word_count: number;
  sexual_words: string[];
  sentiment: ISentiment;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IBadPasteDoc extends Document, IBadPaste {}
