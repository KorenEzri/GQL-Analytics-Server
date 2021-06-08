import { BadPaste } from '../db/schemas';
import { getDataFromTMDatabaseBySource } from './utils';
import { badwords, sexualWords, countOccurrences } from './tools';

const analyzeDataByKeywords = async () => {
  const dataSets = ['stronghold', 'deeppaste'];
  await Promise.all(
    dataSets.map(async (set: string) => {
      const { data, status } = await getDataFromTMDatabaseBySource(set);
      console.log('DATA RECEIVED: ', data);
      data.map((paste: any) => {
        return badwords.RECORDS.map(({ word }) => {
          const { count, words_matched } = countOccurrences(paste, word, false);
          console.log(
            'FOR PASTE: ',
            paste.title,
            'FROM SOURCE: ',
            set,
            'THE COUNT IS: ',
            count,
            'WORDS MATCHED: ',
            words_matched,
          );
        });
      });
    }),
  );
};
