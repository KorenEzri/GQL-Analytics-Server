import Sentiment from 'sentiment';
import { BadPaste } from '../db/schemas';
import { IPaste } from '../types';
import { getDataFromTMDatabaseBySource } from './utils';
import {
  badwords,
  sexualWords,
  drugs,
  checkForProfanity,
  criticalWords,
} from './tools';
const wordlist = [...badwords, ...sexualWords, ...drugs, ...criticalWords];
const sentiment = new Sentiment();

const analyzeSentiment = (data: string) => {
  const { score, positive, negative } = sentiment.analyze(data);
  if (!negative && positive) return score;
  else if (score < 0) return score;
  else return 0;
};
const calculateThreat = (
  titleSentimentScore: number,
  bodySentimentScore: number,
  badword_count: number,
) => {
  return (titleSentimentScore + bodySentimentScore) / 2 + badword_count;
};
export const analyzeDataByKeywords = async () => {
  const { data, status } = await getDataFromTMDatabaseBySource();
  const checkedPastes = data.map((paste: IPaste) => {
    const { badword_count, bad_words } = checkForProfanity(
      paste.body,
      wordlist,
    );

    const title_sentiment = analyzeSentiment(paste.title);
    const body_sentiment = analyzeSentiment(paste.body);
    const threat_level = calculateThreat(
      title_sentiment,
      body_sentiment,
      badword_count,
    );
    console.log(threat_level);
    return {
      _id: paste._id,
      checked: true,
      badword_count,
      badwords,
      title_sentiment,
      body_sentiment,
      threat_level,
    };
  });
};
