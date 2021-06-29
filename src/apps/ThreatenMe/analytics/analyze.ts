import Sentiment from 'sentiment';
import { BadPaste } from '../db/schemas';
import Logger from '../../../logger/logger';
import { IPaste } from '../types';
import {
  badwords,
  sexualWords,
  drugs,
  checkForProfanity,
  criticalWords,
} from './tools';
import { network, routes } from '../network';
const wordlist = [...badwords, ...sexualWords, ...drugs, ...criticalWords];
const sentiment = new Sentiment();

const analyzeSentiment = (data: string) => {
  Logger.info('Checking sentinment..');
  const { score, positive, negative } = sentiment.analyze(data);
  if (!negative && positive) return score;
  else if (score < 0) return score;
  else return 0;
};
const calculateThreat = (
  titleSentimentScore: number,
  bodySentimentScore: number,
  badword_count: number,
  badwords?: any,
) => {
  Logger.info('Calculating threat...');
  const initialScore =
    (titleSentimentScore + bodySentimentScore) / 3 + -1 * badword_count;
  let pedoScore = 0;
  badwords?.forEach((word: string) => {
    if (criticalWords.includes(word)) pedoScore = pedoScore - 2;
  });
  return initialScore + pedoScore;
};
export const analyzeDataByKeywords = async () => {
  Logger.info('Analyzing data by keywords...');
  const { data } = await network.get(`${routes.ThreatenMeDB}false`);
  const checkedPastes = data.map((paste: IPaste) => {
    const { badword_count, bad_words } = checkForProfanity(
      paste.body,
      wordlist,
    );
    const title_sentiment = analyzeSentiment(paste.title);
    const body_sentiment = analyzeSentiment(paste.body);
    const badwords_detected = bad_words ? [...bad_words] : undefined;
    const threat_level = calculateThreat(
      title_sentiment,
      body_sentiment,
      badword_count,
      badwords_detected,
    );
    return {
      _id: paste._id,
      checked: true,
      badword_count,
      badwords: bad_words,
      title_sentiment,
      body_sentiment,
      threat_level,
    };
  });
  let count = 0;
  checkedPastes.forEach(async (checkedPaste: IPaste) => {
    await network.post(routes.UpdatePastes, { checkedPaste });
    if (checkedPaste.threat_level <= -3) {
      count++;
      const badPaste = new BadPaste({ checkedPaste });
      await badPaste.save();
    }
  });
  Logger.info(
    `Found ${count} severe pastes out of ${checkedPastes.length} pastes.`,
  );
};
