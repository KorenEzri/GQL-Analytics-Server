export const checkForProfanity = (
  data: string | string[],
  subStringList: string[],
) => {
  const regex = subStringList.map(badword => `${badword}`).join('|');
  const regexp = new RegExp(`\\b(?<!@)(${regex})\\b`, 'gi');
  if (Array.isArray(data)) {
    const isBad = data.map(text => text.match(regexp));
    return {
      badword_count: isBad.length || 0,
      bad_words: isBad,
    };
  } else {
    const isBad = data.match(regexp);
    return {
      badword_count: isBad?.length || 0,
      bad_words: isBad,
    };
  }
};
