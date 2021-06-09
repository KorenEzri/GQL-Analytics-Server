import { Document } from 'mongoose';

export interface IPaste {
  _id: string;
  uniqueIdentifier: string;
  checked: boolean;
  source: string;
  title: string;
  language: string;
  posted_by: string;
  body: string;
  badword_count: number;
  badwords: string[];
  title_sentiment: number;
  body_sentiment: number;
  threat_level: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
export interface IPastes {
  source: string;
  pastes: IPaste[];
}

export interface PastesDoc extends Document, IPastes {}
