export const countOccurrences = (
  string: string | any[],
  subString: string,
  allowOverlapping: boolean,
) => {
  string += '';
  subString += '';
  if (subString.length <= 0)
    return { count: string.length + 1, words_matched: 'none' };
  const matchedWords: string[] = [];
  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;
  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      matchedWords.push(subString);
      pos += step;
    } else break;
  }
  return { count: n, words_matched: matchedWords };
};
